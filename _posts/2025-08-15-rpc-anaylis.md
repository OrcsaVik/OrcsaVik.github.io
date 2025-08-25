---
layout: page
title: "自我实现RPC-项目分析"
date: 2025-08-24 23:03:00 +0800
tags: ["rpc", "my-project", "java", "distributed-systems"]
excerpt: "个人从0到1自主研发的轻量式RPC框架，支持服务注册发现、负载均衡、序列化、容错重试等完整功能"
---

# 自我实现RPC-项目分析

个人从0到1自主研发的轻量式RPC框架，支持服务注册发现、负载均衡、序列化、容错重试等完整功能。

## 架构分析

### rpc-github-core/ 核心模块包结构

rpc-github-core/
├── src/main/java/com/github/rpc/
│ ├── RpcApplication.java # 框架初始化入口类
│ ├── common/ # 通用组件包
│ │ ├── proxy/ # 代理相关
│ │ │ └── ServiceProxy.java # RPC服务代理实现
│ │ ├── registry/ # 注册中心相关
│ │ │ ├── Registry.java # 注册中心接口
│ │ │ ├── RegistryFactory.java # 注册中心工厂
│ │ │ └── localcache/ # 本地缓存
│ │ │ └── LocalRegistry.java # 本地服务注册表
│ │ └── utils/ # 工具类
│ │ └── ConfigUtils.java # 配置加载工具
│ ├── config/ # 配置相关
│ │ ├── GlobalRpcConfig.java # 全局RPC配置
│ │ └── RegistryConfig.java # 注册中心配置
│ ├── constants/ # 常量定义
│ │ ├── LoadBalancerConstant.java # 负载均衡常量
│ │ ├── RetryStrategyConstant.java # 重试策略常量
│ │ ├── SerializerStrategyConstant.java # 序列化策略常量
│ │ └── RpcLoadConstant.java # RPC加载常量
│ ├── exception/ # 异常处理
│ │ ├── RpcException.java # RPC异常类
│ │ ├── BizException.java # 业务异常基类
│ │ └── BaseExceptionInterface.java # 异常接口
│ ├── model/ # 数据模型
│ │ ├── RpcRequest.java # RPC请求模型
│ │ ├── RpcResponse.java # RPC响应模型
│ │ └── dto/ # 数据传输对象
│ │ └── ServiceMetaInfoDTO.java # 服务元信息DTO
│ └── service/ # 服务相关
│ └── web/ # Web服务
│ └── VertxHttpServer.java # Vert.x HTTP服务器


### Spring集成包作用分析

rpc-github-spring/
├── src/main/java/com/github/rpc/spring/
│ ├── annotation/ # 注解定义包
│ │ ├── EnableRpc.java # 启用RPC框架注解
│ │ ├── RpcService.java # RPC服务提供者注解
│ │ └── RpcReference.java # RPC服务消费者注解
│ └── bootstrap/ # 启动引导包
│ ├── RpcInitBootstrap.java # RPC框架初始化引导
│ ├── RpcProviderBootstrap.java # 服务提供者引导
│ └── RpcConsumerBootstrap.java # 服务消费者引导


## 手动分析

### 具体引入spring

✅ **作用总结**  
`@Import` 的作用是：当其他类使用了 `@EnableRpc` 注解时，Spring 会自动将 `RpcInitBootstrap`、`RpcProviderBootstrap` 和 `RpcConsumerBootstrap` 这三个类注册为 Spring 容器中的 Bean。

换句话说，它实现了"启用 RPC 功能"这一能力的自动装配。

三种可能的导入类型（Spring 的 `@Import` 支持）：
- 普通类：直接注册为 Bean
- 实现了 `ImportSelector` 接口的类：编程式决定导入配置
- 实现了 `ImportBeanDefinitionRegistrar` 接口的类：手动控制 BeanDefinition 注册

### Spring启动服务周期


Spring Boot 启动
↓
new AnnotationConfigApplicationContext(App.class)
↓
AbstractApplicationContext.refresh()
↓
invokeBeanFactoryPostProcessors() ← ⭐️ 关键阶段！
↓
ConfigurationClassPostProcessor.processConfigBeanDefinitions()
↓
解析 @Import 注解
↓
发现类实现了 ImportBeanDefinitionRegistrar
↓
实例化该 registrar 并调用 registerBeanDefinitions() ← ⭐️ 你的代码在这里执行！
↓
注册新的 BeanDefinition 到 BeanFactory
↓
registerBeanPostProcessors() // 注册 Bean 后置处理器
initMessageSource() // 初始化国际化等
...（中间略）
finishBeanFactoryInitialization() // 实例化所有非懒加载的单例 Bean（doCreateBean）
↓
Bean 的完整生命周期开始：构造 → 属性填充 → 初始化 → ...


## AI分析文章

### SPI加载机制

```java
Class<?> implClass = keyClassMap.get(key);
String implClassName = implClass.getName();
if (!instanceCache.containsKey(implClassName)) {
    try {
        instanceCache.put(implClassName, implClass.newInstance());
    } catch (InstantiationException | IllegalAccessException e) {
        String errorMsg = String.format("%s 类实例化失败", implClassName);
        throw new BizException(ResponseCodeEnum.INSTANCE_INIT_ERROR + errorMsg);
    }
}
return (T) instanceCache.get(implClassName);
```

### 服务代理发起请求

```java
// 在ServiceProxy中的实际运用
// 在RPC调用的核心类ServiceProxy中，这些工厂方法被实际调用 ServiceProxy.java:60-84 ：

// 第60行：获取注册中心实例
// 第70行：获取负载均衡器实例
// 第78行：获取序列化器实例
// 第82行：获取重试策略实例
// 第84行：获取容错策略实例
```

### 可扩展性

**Extensibility Through SPI**  
通过 SPI 实现可扩展性

SPI 机制的设计允许在不修改核心框架代码的情况下添加新的配置源。自定义实现可以放置在 `META-INF/rpc/custom/` 目录中，并在加载过程中自动发现。


## 待优化

### 优化目标

> 实现运行项目的热加载

#### 加入对应热配置处理

```java
public static void init() {
    GlobalRpcConfig newRpcConfig;
    try {
        newRpcConfig = ConfigUtils.loadConfig(GlobalRpcConfig.class, RpcLoadConstant.DEFAULT_CONFIG_PREFIX, environment);
    } catch (Exception e) {
        newRpcConfig = new GlobalRpcConfig();
    }
    init(newRpcConfig);
}
```

