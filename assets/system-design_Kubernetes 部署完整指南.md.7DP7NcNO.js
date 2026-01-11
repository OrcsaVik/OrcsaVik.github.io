import{_ as o,C as t,c,o as r,j as n,G as a,ai as e,a as p}from"./chunks/framework.6CbiclxB.js";const v=JSON.parse('{"title":"虚拟机","description":"","frontmatter":{},"headers":[],"relativePath":"system-design/Kubernetes 部署完整指南.md","filePath":"system-design/Kubernetes 部署完整指南.md","lastUpdated":1768136749000}'),d={name:"system-design/Kubernetes 部署完整指南.md"};function h(k,s,u,g,b,m){const i=t("ArticleMetadata"),l=t("timestam");return r(),c("div",null,[s[2]||(s[2]=n("h1",{id:"虚拟机",tabindex:"-1"},[p("虚拟机 "),n("a",{class:"header-anchor",href:"#虚拟机","aria-label":'Permalink to "虚拟机"'},"​")],-1)),a(i),s[3]||(s[3]=e(`<p>重启会改变ip DHCP NAT VMware-8</p><p><a href="https://blog.csdn.net/qq_41860461/article/details/122418639" target="_blank" rel="noreferrer">VMware虚拟机部署k8s集群_vmqk18-CSDN博客</a></p><p><a href="https://www.cnblogs.com/yyq1/p/13991453.html" target="_blank" rel="noreferrer">K8S构建1台master2台node+Harbor - 一代肝帝 - 博客园 (cnblogs.com)</a></p><p><a href="https://blog.csdn.net/wgc0802402/article/details/91046196" target="_blank" rel="noreferrer">Ubuntu18.04下安装配置SSH服务_ubuntu18.04 ssh yrs-CSDN博客</a></p><p><a href="https://blog.csdn.net/weixin_56261190/article/details/144807447" target="_blank" rel="noreferrer">VMware 虚拟机网络配置 【100%解决】【超详细】_vmware虚拟机网络配置-CSDN博客</a></p><p><a href="https://zhuanlan.zhihu.com/p/665154528#:~:text=%E5%AE%89%E8%A3%85open-vm-tools%E5%AE%89%E8%A3%85open-vm-tools-desktop%E5%A6%82%E5%9B%BE%E5%BC%80%E5%90%AF%E8%99%9A%E6%8B%9F%E6%9C%BA%E8%AE%BE%E7%BD%AE" target="_blank" rel="noreferrer">VMware虚拟机和主机间复制粘贴共享剪贴板 - 知乎 (zhihu.com)</a></p><p>[(14 条消息) 【Ubuntu】Ubuntu 18.04 LTS 更换国内源——解决终端下载速度慢的问题 - 知乎 (zhihu.com)](<a href="https://zhuanlan.zhihu.com/p/61228593#:~:text=%E6%9C%80%E8%BF%91%E8%A3%85%E4%BA%86ubuntu18.04" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/61228593#:~:text=最近装了ubuntu18.04</a> LTS，下载软件有点慢，网上搜了下解决方案，大致是两种：一、把/etc/apt/sources.list文件里的源更换一下，改成阿里云或者其它的镜像的文件；二、更换software&amp;updates里的select)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>network:</span></span>
<span class="line"><span>  ethernets:</span></span>
<span class="line"><span>    ens33:  # 网卡名称，与 ip addr 显示的一致</span></span>
<span class="line"><span>      dhcp4: no  # 关闭 DHCP</span></span>
<span class="line"><span>      addresses: [192.168.66.10/24]  # 静态 IP 及子网掩码（/24 对应 255.255.255.0）</span></span>
<span class="line"><span>      gateway4: 192.168.66.1  # 网关（从之前的路由信息推测，通常是 NAT 模式的虚拟网关）</span></span>
<span class="line"><span>      nameservers:</span></span>
<span class="line"><span>        addresses: [8.8.8.8, 223.6.6.6]  # DNS 服务器</span></span>
<span class="line"><span>  version: 2</span></span>
<span class="line"><span>  renderer: networkd</span></span></code></pre></div><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/netplan/01-network-manager-all.yaml</span></span></code></pre></div><h3 id="四、正确配置-让静态-ip-生效" tabindex="-1">四、正确配置：让静态 IP 生效 <a class="header-anchor" href="#四、正确配置-让静态-ip-生效" aria-label="Permalink to &quot;四、正确配置：让静态 IP 生效&quot;">​</a></h3><p>若要使用 <code>netplan</code> 配置静态 IP（而非图形界面），需调整 <code>01-network-manager-all.yaml</code>，让特定接口由 <code>networkd</code> 管理，避免冲突。</p><h4 id="步骤-1-编辑-01-network-manager-all-yaml" tabindex="-1">步骤 1：编辑 <code>01-network-manager-all.yaml</code> <a class="header-anchor" href="#步骤-1-编辑-01-network-manager-all-yaml" aria-label="Permalink to &quot;步骤 1：编辑 \`01-network-manager-all.yaml\`&quot;">​</a></h4><p>bas</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/netplan/01-network-manager-all.yaml</span></span></code></pre></div><h4 id="步骤-2-修改配置-关键" tabindex="-1">步骤 2：修改配置（关键） <a class="header-anchor" href="#步骤-2-修改配置-关键" aria-label="Permalink to &quot;步骤 2：修改配置（关键）&quot;">​</a></h4><p>保留 <code>NetworkManager</code> 管理其他接口（如需），但指定 <code>ens33</code> 由 <code>networkd</code> 管理（用于静态 IP）：</p><p>yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">NetworkManager</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 其他接口仍由 NetworkManager 管理</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  ethernets</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ens33</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 针对你的网卡（ens33）单独指定渲染器</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">networkd</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 用 networkd 管理该接口（适合静态 IP）</span></span></code></pre></div><h4 id="步骤-3-确保-01-netcfg-yaml-配置正确" tabindex="-1">步骤 3：确保 <code>01-netcfg.yaml</code> 配置正确 <a class="header-anchor" href="#步骤-3-确保-01-netcfg-yaml-配置正确" aria-label="Permalink to &quot;步骤 3：确保 \`01-netcfg.yaml\` 配置正确&quot;">​</a></h4><p>编辑 <code>01-netcfg.yaml</code>（若不存在可创建），配置静态 IP：</p><p>yaml</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">network</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  version</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  renderer</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">networkd</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 与上一步的 ens33 渲染器一致</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">  ethernets</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ens33</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      dhcp4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">no</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 关闭 DHCP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      addresses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">192.168.66.130/24</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 静态 IP</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      gateway4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">192.168.66.1</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 网关（从 ip route 确认）</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">      nameservers</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">        addresses</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">223.5.5.5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">223.6.6.6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># DNS</span></span></code></pre></div><h4 id="步骤-4-应用配置并验证" tabindex="-1">步骤 4：应用配置并验证 <a class="header-anchor" href="#步骤-4-应用配置并验证" aria-label="Permalink to &quot;步骤 4：应用配置并验证&quot;">​</a></h4><p>bash</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 检查配置格式错误</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> netplan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> try</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 应用配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> netplan</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apply</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 重启网络服务</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemd-networkd</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 验证 IP 是否生效</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> addr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> show</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ens33</span></span></code></pre></div><p>echo &quot;192.168.66.10 master 192.168.66.11 node01 192.168.66.12 node02&quot;/&gt;&gt; /etc/hosts</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># master 节点</span></span>
<span class="line"><span>sudo hostnamectl set-hostname k8s-master01</span></span>
<span class="line"><span></span></span>
<span class="line"><span># node1 节点</span></span>
<span class="line"><span>sudo hostnamectl set-hostname k8s-node01</span></span>
<span class="line"><span></span></span>
<span class="line"><span># node2 节点</span></span>
<span class="line"><span>sudo hostnamectl set-hostname k8s-node02</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Harbor 节点</span></span>
<span class="line"><span>sudo hostnamectl set-hostname hub</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 验证主机名</span></span>
<span class="line"><span>hostname</span></span></code></pre></div><p>depends: nf_defrag_ipv6,libcrc32c,nf_defrag_ipv4</p><h3 id="_3-能否通过降级-k8s-版本来使用-docker-ce" tabindex="-1">3. <strong>能否通过降级 K8s 版本来使用 Docker-CE？</strong> <a class="header-anchor" href="#_3-能否通过降级-k8s-版本来使用-docker-ce" aria-label="Permalink to &quot;3. **能否通过降级 K8s 版本来使用 Docker-CE？**&quot;">​</a></h3><p>✅ <strong>可以，但仅限于 Kubernetes ≤ 1.23 版本。</strong></p><table tabindex="0"><thead><tr><th>Kubernetes 版本</th><th>是否支持 Docker-CE</th><th>说明</th></tr></thead><tbody><tr><td>≤ 1.23</td><td>✅ 支持（通过 dockershim）</td><td>可以使用 <code>docker://</code> 运行时</td></tr><tr><td>≥ 1.24</td><td>❌ 不支持</td><td><code>dockershim</code> 已移除</td></tr></tbody></table><h4 id="使用其他容器进行部署" tabindex="-1">使用其他容器进行部署 <a class="header-anchor" href="#使用其他容器进行部署" aria-label="Permalink to &quot;使用其他容器进行部署&quot;">​</a></h4><p>containerd 使用文档</p><p>配置第三方镜像</p><p><a href="https://www.cnblogs.com/Chary/articles/18701060" target="_blank" rel="noreferrer">Containerd配置国内镜像源 - CharyGao - 博客园 (cnblogs.com)</a></p><p><a href="https://www.cnblogs.com/yinzhengjie/p/18058010" target="_blank" rel="noreferrer">containerd容器运行时快速入门使用指南 - 尹正杰 - 博客园 (cnblogs.com)</a></p><p>修改原先部署文档</p><p>使用新版本k8s进行部署 container</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>WARN[0000] runtime connect using default endpoints: [unix:///var/run/dockershim.sock unix:///run/containerd/containerd.sock unix:///run/crio/crio.sock unix:///var/run/cri-dockerd.sock]. As the default settings are now deprecated, you should set the endpoint instead. </span></span>
<span class="line"><span>ERRO[0000] validate service connection: validate CRI v1 runtime API for endpoint &quot;unix:///var/run/dockershim.sock&quot;: rpc error: code = Unavailable desc = connection error: desc = &quot;transport: Error while dialing dial unix /var/run/dockershim.sock: connect: no such file or directory&quot; </span></span>
<span class="line"><span>Version:  0.1.0</span></span>
<span class="line"><span>RuntimeName:  containerd</span></span>
<span class="line"><span>RuntimeVersion:  1.6.12-0ubuntu1~18.04.1</span></span>
<span class="line"><span>RuntimeApiVersion:  v1</span></span>
<span class="line"><span>检查错误</span></span>
<span class="line"><span></span></span>
<span class="line"><span>从错误信息来看，crictl 无法正常连接容器运行时（dockershim 不可用，但检测到了 containerd），主要原因是 K8s 1.24+ 已移除 dockershim，而你的环境中实际使用的是 containerd 作为容器运行时，但 crictl 默认配置仍指向 dockershim，导致连接失败。以下是具体解决步骤：</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>步骤 3：验证配置是否生效</span></span>
<span class="line"><span>再次执行 crictl version，若输出类似以下内容，说明连接成功：</span></span>
<span class="line"><span>plaintext</span></span>
<span class="line"><span>Version:  0.1.0</span></span>
<span class="line"><span>RuntimeName:  containerd</span></span>
<span class="line"><span>RuntimeVersion:  1.6.12-0ubuntu1~18.04.1</span></span>
<span class="line"><span>RuntimeApiVersion:  v1</span></span>
<span class="line"><span>步骤 4：测试 crictl 功能</span></span>
<span class="line"><span>bash</span></span>
<span class="line"><span># 查看镜像列表（与 \`ctr images list\` 类似）</span></span>
<span class="line"><span>crictl images</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看正在运行的容器</span></span>
<span class="line"><span>crictl ps</span></span></code></pre></div><p>scp sz rz</p><p><a href="https://www.52runoob.com/archives/4832" target="_blank" rel="noreferrer">Linux文件传输详解:rz、sz与scp命令_rz命令 – 菜鸟-创作你的创作 (52runoob.com)</a></p><p>例如：本地当前用 <code>user1</code> 登录，执行上述命令时，会默认尝试用 <code>user1@192.168.1.100</code> 登录远程服务器。</p><p>⚠️ 注意：若远程服务器不存在与本地相同的用户名（如本地 <code>user1</code>，远程无 <code>user1</code>），会直接报错 <code>Permission denied</code> 或 <code>No such user</code>。</p><p>这是 <code>scp</code> 首次连接远程主机 <code>192.168.66.11</code> 时的正常安全验证提示，目的是确认远程主机身份，防止 “中间人攻击”。后续输出及操作步骤如下：</p><p>kubectl启动失败</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10月 01 20:09:22 k8s-master01 kubelet[15723]: E1001 20:09:22.444493   15723 run.go:74] &quot;command failed&quot; err=&quot;failed to load kubelet config file, path: /var/lib/kubelet/config.yaml, error: failed to load Kubelet config file /var/lib/kubelet/config.yaml, error failed to read kubelet config file \\&quot;/var/lib/kubelet/config.yaml\\&quot;, error: open /var/lib/kubelet/config.yaml: no such file or directory&quot;</span></span>
<span class="line"><span>10月 01 20:09:22 k8s-master01 systemd[1]: kubelet.service: Main process exited, code=exited, status=1/FAILURE</span></span>
<span class="line"><span>10月 01 20:09:22 k8s-master01 systemd[1]: kubelet.service: Failed with result &#39;exit-code&#39;.</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: kubelet.service: Service hold-off time over, scheduling restart.</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: kubelet.service: Scheduled restart job, restart counter is at 37.</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: Stopped kubelet: The Kubernetes Node Agent.</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: Started kubelet: The Kubernetes Node Agent.</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 kubelet[15754]: E1001 20:09:32.688448   15754 run.go:74] &quot;command failed&quot; err=&quot;failed to load kubelet config file, path: /var/lib/kubelet/config.yaml, error: failed to load Kubelet config file /var/lib/kubelet/config.yaml, error failed to read kubelet config file \\&quot;/var/lib/kubelet/config.yaml\\&quot;, error: open /var/lib/kubelet/config.yaml: no such file or directory&quot;</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: kubelet.service: Main process exited, code=exited, status=1/FAILURE</span></span>
<span class="line"><span>10月 01 20:09:32 k8s-master01 systemd[1]: kubelet.service: Failed with result &#39;exit-code&#39;.</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 查看可用版本（确认 1.28.2 可用）</span></span>
<span class="line"><span>apt-cache madison kubeadm | grep -E &#39;1\\.28\\.2|1\\.28\\.1&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 安装 1.28.2 版本（关键修正）</span></span>
<span class="line"><span>VERSION=1.28.2-00</span></span>
<span class="line"><span>sudo apt install -y kubeadm=$VERSION kubelet=$VERSION kubectl=$VERSION</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 锁定版本（防止自动升级）</span></span>
<span class="line"><span>sudo apt-mark hold kubeadm kubelet kubectl</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启用并启动 kubelet</span></span>
<span class="line"><span>sudo systemctl enable --now kubelet</span></span></code></pre></div><h4 id="_2-验证安装-关键验证" tabindex="-1">2. 验证安装（关键验证） <a class="header-anchor" href="#_2-验证安装-关键验证" aria-label="Permalink to &quot;2. 验证安装（关键验证）&quot;">​</a></h4><p>使用一键式进行部署</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. 检查 K8s 版本</span></span>
<span class="line"><span>kubectl version --client --short</span></span>
<span class="line"><span># 输出：Client Version: v1.28.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 检查节点状态</span></span>
<span class="line"><span>kubectl get nodes</span></span>
<span class="line"><span># 输出：k8s-master01   Ready   ...   v1.28.2</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 检查 Flannel 状态</span></span>
<span class="line"><span>kubectl get pods -n kube-system -l k8s-app=flannel</span></span>
<span class="line"><span># 输出：kube-flannel-ds-...   Running</span></span></code></pre></div><h4 id="配置加载模块" tabindex="-1">配置加载模块 <a class="header-anchor" href="#配置加载模块" aria-label="Permalink to &quot;配置加载模块&quot;">​</a></h4><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>error execution phase preflight: [preflight] Some fatal errors occurred:</span></span>
<span class="line"><span>	[ERROR FileContent--proc-sys-net-bridge-bridge-nf-call-iptables]: /proc/sys/net/bridge/bridge-nf-call-iptables does not exist</span></span>
<span class="line"><span>[preflight] If you know what you are doing, you can make a check non-fatal with \`--ignore-preflight-errors=...\`</span></span>
<span class="line"><span>To see the stack trace of this error execute with --v=5 or higher</span></span></code></pre></div><blockquote><p>这个错误是因为 Linux 内核模块 br_netfilter 没有加载，导致 /proc/sys/net/bridge/bridge-nf-call-iptables 不存在。</p><p>这是 Kubernetes 的常见前置检查项，必须修复（不能简单忽略），否则 Pod 网络会异常。</p></blockquote><h3 id="habor镜像仓库设置" tabindex="-1">Habor镜像仓库设置 <a class="header-anchor" href="#habor镜像仓库设置" aria-label="Permalink to &quot;Habor镜像仓库设置&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>八、部署 Harbor 镜像仓库（v2.11）</span></span>
<span class="line"><span>（Harbor 配置保持不变，但需确保 Docker 依赖已移除）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. 安装 Docker Compose</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>sudo curl -L &quot;https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)&quot; -o /usr/local/bin/docker-compose</span></span>
<span class="line"><span>sudo chmod +x /usr/local/bin/docker-compose</span></span>
<span class="line"><span>docker-compose --version</span></span>
<span class="line"><span>2. 解压 Harbor 安装包（v2.11.0）</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>cd /root</span></span>
<span class="line"><span>tar xzvf harbor-offline-installer-v2.11.0.tgz</span></span>
<span class="line"><span>sudo mv harbor /usr/local/</span></span>
<span class="line"><span>3. 配置 Harbor（关键：启用 insecure-registries）</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>cd /usr/local/harbor</span></span>
<span class="line"><span>sudo vim harbor.cfg</span></span>
<span class="line"><span>Ini</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>hostname = hub.yyq.com</span></span>
<span class="line"><span>ui_url_protocol = https</span></span>
<span class="line"><span>db_password = root123</span></span>
<span class="line"><span>ssl_cert = /data/cert/server.crt</span></span>
<span class="line"><span>ssl_cert_key = /data/cert/server.key</span></span>
<span class="line"><span>harbor_admin_password = Harbor12345</span></span>
<span class="line"><span># 添加以下配置（让 K8s 节点信任 Harbor）</span></span>
<span class="line"><span>insecure_registry = hub.yyq.com</span></span>
<span class="line"><span>4. 生成 HTTPS 证书（同原文档，但路径需修正）</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>sudo mkdir -p /data/cert</span></span>
<span class="line"><span>cd /data/cert</span></span>
<span class="line"><span>sudo openssl genrsa -des3 -out server.key 2048</span></span>
<span class="line"><span>sudo openssl req -new -key server.key -out server.csr</span></span>
<span class="line"><span>sudo cp server.key server.key.org</span></span>
<span class="line"><span>sudo openssl rsa -in server.key.org -out server.key</span></span>
<span class="line"><span>sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt</span></span>
<span class="line"><span>sudo chmod 644 server.*</span></span>
<span class="line"><span>5. 安装 Harbor</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>cd /usr/local/harbor</span></span>
<span class="line"><span>sudo ./install.sh</span></span>
<span class="line"><span>九、K8s 部署应用并测试</span></span>
<span class="line"><span>1. 部署 nginx 应用（使用 Harbor 镜像）</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span># 创建 Deployment</span></span>
<span class="line"><span>kubectl run nginx-deployment --image=hub.yyq.com/library/mynginx:v1 --port=80 --replicas=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 验证</span></span>
<span class="line"><span>kubectl get pods -o wide</span></span>
<span class="line"><span>2. 暴露应用为 Service</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>kubectl expose deployment nginx-deployment --port=30000 --target-port=80 --type=NodePort</span></span>
<span class="line"><span>kubectl get svc</span></span>
<span class="line"><span>3. 外部访问测试</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span># 在宿主机浏览器访问</span></span>
<span class="line"><span>http://192.168.66.20:31679  # 替换为实际 NodePort</span></span>
<span class="line"><span>✅ 成功标志：浏览器显示 &quot;Welcome to nginx!&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>🔥 关键验证命令（部署后必做）</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span># 1. 验证 K8s 版本</span></span>
<span class="line"><span>kubectl version --short</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 验证 CRI 运行时</span></span>
<span class="line"><span>sudo crictl info | grep -A 2 runtime</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 验证 Flannel 网络</span></span>
<span class="line"><span>kubectl get pods -n kube-system | grep flannel</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 验证 Harbor 镜像仓库</span></span>
<span class="line"><span>curl -k https://hub.yyq.com/v2/  # -k 忽略 SSL 证书错误</span></span></code></pre></div><ol start="2"><li>基于二进制文件部署</li></ol><p><strong>步骤：</strong></p><ol><li>手动下载 Kubernetes 组件（如 kube-apiserver、kube-controller-manager 等）。</li><li>配置每个组件的参数和启动命令。</li><li>部署 etcd 集群作为数据存储。</li><li>启动 Kubernetes 组件并配置网络插件。</li></ol><p><strong>适用场景：</strong> 适合需要高度自定义和深入了解 Kubernetes 工作原理的用户。</p><p><a href="https://blog.csdn.net/weixin_42789698/article/details/130041994" target="_blank" rel="noreferrer">K8S——平台规划和部署方式（尚硅谷，二进制安装方式不太友好）_尚硅谷kubernetes部署文档-CSDN博客</a></p><p>错误</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>info: node \\&quot;k8s-master01\\&quot; not found&quot;</span></span>
<span class="line"><span>10月 01 20:21:21 k8s-master01 kubelet[18425]: E1001 20:21:21.782698   18425 event.go:289] Unable to write event: &#39;&amp;v1.Event{TypeMeta:v1.TypeMeta{Kind:&quot;&quot;, APIVersion:&quot;&quot;}, ObjectMeta:v1.ObjectMeta{Name:&quot;k8s-master01.186a5d58fd5aabfb&quot;, GenerateName:&quot;&quot;, Namespace:&quot;default&quot;, SelfLink:&quot;&quot;, UID:&quot;&quot;, ResourceVersion:&quot;&quot;, Generation:0, CreationTimestamp:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), DeletionTimestamp:&lt;ni/&gt;, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string(nil), OwnerReferences:[]v1.OwnerReference(nil), Finalizers:[]string(nil), ManagedFields:[]v1.ManagedFieldsEntry(nil)}, InvolvedObject:v1.ObjectReference{Kind:&quot;Node&quot;, Namespace:&quot;&quot;, Name:&quot;k8s-master01&quot;, UID:&quot;k8s-master01&quot;, APIVersion:&quot;&quot;, ResourceVersion:&quot;&quot;, FieldPath:&quot;&quot;}, Reason:&quot;Starting&quot;, Message:&quot;Starting kubelet.&quot;, Source:v1.EventSource{Component:&quot;kubelet&quot;, Host:&quot;k8s-master01&quot;}, FirstTimestamp:time.Date(2025, time.October, 1, 20, 20, 41, 230683131, time.Local), LastTimestamp:time.Date(2025, time.October, 1, 20, 20, 41, 230683131, time.Local), Count:1, Type:&quot;Normal&quot;, EventTime:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Series:(*v1.EventSeries)(nil), Action:&quot;&quot;, Related:(*v1.ObjectReference)(nil), ReportingController:&quot;kubelet&quot;, ReportingInstance:&quot;k8s-master01&quot;}&#39;: &#39;Post &quot;https://192.168.66.10:6443/api/v1/namespaces/default/events&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&#39;(may retry after sleeping)</span></span>
<span class="line"><span>10月 01 20:21:21 k8s-master01 kubelet[18425]: E1001 20:21:21.851302   18425 controller.go:146] &quot;Failed to ensure lease exists, will retry&quot; err=&quot;Get \\&quot;https://192.168.66.10:6443/apis/coordination.k8s.io/v1/namespaces/kube-node-lease/leases/k8s-master01?timeout=10s\\&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&quot; interval=&quot;7s&quot;</span></span>
<span class="line"><span>10月 01 20:21:22 k8s-master01 kubelet[18425]: I1001 20:21:22.007152   18425 kubelet_node_status.go:70] &quot;Attempting to register node&quot; node=&quot;k8s-master01&quot;</span></span>
<span class="line"><span>10月 01 20:21:22 k8s-master01 kubelet[18425]: E1001 20:21:22.007825   18425 kubelet_node_status.go:92] &quot;Unable to register node with API server&quot; err=&quot;Post \\&quot;https://192.168.66.10:6443/api/v1/nodes\\&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&quot; node=&quot;k8s-master01&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#</span></span></code></pre></div><p>配置镜像原</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 设置阿里云镜像源（关键修复！）</span></span>
<span class="line"><span>export REGISTRY=registry.aliyuncs.com/google_containers</span></span></code></pre></div><h4 id="node安装k8s文档" tabindex="-1">node安装k8s文档 <a class="header-anchor" href="#node安装k8s文档" aria-label="Permalink to &quot;node安装k8s文档&quot;">​</a></h4><p>设置相同镜像</p><p>root@k8s-node01:/etc/apt# pwd /etc/apt</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 1. remove old k8s repo if exists</span></span>
<span class="line"><span>rm -f /etc/apt/sources.list.d/kubernetes.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. add the official k8s repo</span></span>
<span class="line"><span>curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -</span></span>
<span class="line"><span>cat &lt;&lt;EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list</span></span>
<span class="line"><span>deb https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /  # v1.28 repo</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. update package index</span></span>
<span class="line"><span>apt-get update</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-cache madison kubelet kubeadm kubectl</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-get install -y \\</span></span>
<span class="line"><span>  kubelet=1.28.2-1.1 \\</span></span>
<span class="line"><span>  kubeadm=1.28.2-1.1 \\</span></span>
<span class="line"><span>  kubectl=1.28.2-1.1</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apt-mark hold kubelet kubeadm kubectl</span></span></code></pre></div><p><strong>systemctl enable kubelet --now</strong></p><p>这里版本对应1.28.2-1.1</p><p>同时在unbuunru上运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>当然可以！以下是**改写并优化后的完整流程说明**，适配你当前的环境（Ubuntu 18.04 + Kubernetes v1.28.2 + 阿里云镜像源），并**明确指出关键配置与常见陷阱**（如 \`NotReady\` 问题）：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 🚀 初始化 Master 节点（使用阿里云镜像源，避免拉取超时）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>kubeadm init \\</span></span>
<span class="line"><span>  --apiserver-advertise-address=192.168.66.10 \\</span></span>
<span class="line"><span>  --image-repository=registry.aliyuncs.com/google_containers \\</span></span>
<span class="line"><span>  --kubernetes-version=v1.28.2 \\</span></span>
<span class="line"><span>  --service-cidr=10.96.0.0/12 \\</span></span>
<span class="line"><span>  --pod-network-cidr=10.244.0.0/16</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; ✅ 说明：</span></span>
<span class="line"><span>&gt; - \`--image-repository\` 指定阿里云镜像仓库，避免访问 \`k8s.gcr.io\` 超时</span></span>
<span class="line"><span>&gt; - \`--pod-network-cidr=10.244.0.0/16\` 为 **Flannel 网络插件**的标准 CIDR（若用 Calico 等需调整）</span></span>
<span class="line"><span>&gt; - \`--apiserver-advertise-address\` 必须是你 master 的 **实际内网 IP**</span></span>
<span class="line"><span></span></span>
<span class="line"><span>执行成功后，会输出类似以下的 \`kubeadm join\` 命令（**务必保存！**）。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 🧾 配置 kubectl（仅在 master 执行）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>mkdir -p $HOME/.kube</span></span>
<span class="line"><span>sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span>sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>现在你可以使用 \`kubectl\` 管理集群。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 🔍 查看节点状态</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>kubectl get nodes</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你会看到 master 节点状态为 **\`NotReady\`** —— 这是**正常现象**，因为 **CNI 网络插件尚未安装**。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; ⚠️ 所有节点（包括 master）在未安装 CNI 前都会是 \`NotReady\`！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>### ➕ 将 Worker 节点加入集群</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在 **每个 worker 节点**（如 \`k8s-node01\`）上执行你在 master 初始化后获得的 \`join\` 命令，例如：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>kubeadm join 192.168.66.10:6443 \\</span></span>
<span class="line"><span>  --token 2g250x.30bomobd2v6s3hjm \\</span></span>
<span class="line"><span>  --discovery-token-ca-cert-hash sha256:02a19437bd9725fc8067ed26dce92120a55918e60afc95d3c72a2564e1d76de8</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; 💡 如果 token 过期（默认 24 小时），在 master 重新生成：</span></span>
<span class="line"><span>&gt; \`\`\`bash</span></span>
<span class="line"><span>&gt; kubeadm token create --print-join-command</span></span>
<span class="line"><span>&gt; \`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### ✅ 最终验证</span></span>
<span class="line"><span></span></span>
<span class="line"><span>在 master 执行：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`bash</span></span>
<span class="line"><span>kubectl get nodes</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出应类似：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span>NAME           STATUS   ROLES           AGE   VERSION</span></span>
<span class="line"><span>k8s-master01   Ready    control-plane   5m    v1.28.2</span></span>
<span class="line"><span>k8s-node01     Ready    &lt;non/&gt;          1m    v1.28.2</span></span>
<span class="line"><span>\`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>所有节点 \`STATUS\` 为 **\`Ready\`**，表示集群已正常运行！</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### 🔒 补充建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- **不要忽略 CNI 安装**：这是 \`NotReady\` 的最常见原因</span></span>
<span class="line"><span>- **确保所有节点时间同步**：使用 \`chrony\` 或 \`ntp\`</span></span>
<span class="line"><span>- **关闭 swap**（已在 kubeadm preflight 检查中强制要求）：</span></span>
<span class="line"><span>  \`\`\`bash</span></span>
<span class="line"><span>  swapoff -a</span></span>
<span class="line"><span>  sed -i &#39;/ swap / s/^/#/&#39; /etc/fstab</span></span>
<span class="line"><span>  \`\`\`</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>现在你的集群已经完整搭建成功！🎉  </span></span>
<span class="line"><span>下一步可以部署应用、安装 Ingress、Metrics Server 等。</span></span></code></pre></div><blockquote><p>/&gt; <strong><code>[kubelet-check] Initial timeout of 40s passed.</code></strong> /&gt; 并且卡在 <code>[wait-control-plane] Waiting for the kubelet to boot up the control plane...</code></p><p>这说明 <strong>kubelet 启动了，但 control plane Pods（apiserver、etcd 等）迟迟没有 Running</strong>。</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>root@k8s-master01:/home/master# crictl pull registry.aliyuncs.com/google_containers/kube-apiserver:v1.28.2</span></span>
<span class="line"><span>Image is up to date for sha256:cdcab12b2dd16cce4efc5dd43c082469364f19ad978e922d110b74a42eff7cce</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Logs begin at Wed 2025-10-01 16:00:37 CST, end at Thu 2025-10-02 11:53:18 CST. --</span></span>
<span class="line"><span>10月 02 11:52:06 k8s-master01 kubelet[4104]: E1002 11:52:06.228980    4104 event.go:289] Unable to write event: &#39;&amp;v1.Event{TypeMeta:v1.TypeMeta{Kind:&quot;&quot;, APIVersion:&quot;&quot;}, ObjectMeta:v1.ObjectMeta{Name:&quot;k8s-master01.186a8ff2eec565b2&quot;, GenerateName:&quot;&quot;, Namespace:&quot;default&quot;, SelfLink:&quot;&quot;, UID:&quot;&quot;, ResourceVersion:&quot;&quot;, Generation:0, CreationTimestamp:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), DeletionTimestamp:&lt;ni/&gt;, DeletionGracePeriodSeconds:(*int64)(nil), Labels:map[string]string(nil), Annotations:map[string]string(nil), OwnerReferences:[]v1.OwnerReference(nil), Finalizers:[]string(nil), ManagedFields:[]v1.ManagedFieldsEntry(nil)}, InvolvedObject:v1.ObjectReference{Kind:&quot;Node&quot;, Namespace:&quot;&quot;, Name:&quot;k8s-master01&quot;, UID:&quot;k8s-master01&quot;, APIVersion:&quot;&quot;, ResourceVersion:&quot;&quot;, FieldPath:&quot;&quot;}, Reason:&quot;NodeHasSufficientMemory&quot;, Message:&quot;Node k8s-master01 status is now: NodeHasSufficientMemory&quot;, Source:v1.EventSource{Component:&quot;kubelet&quot;, Host:&quot;k8s-master01&quot;}, FirstTimestamp:time.Date(2025, time.October, 2, 11, 47, 57, 992371634, time.Local), LastTimestamp:time.Date(2025, time.October, 2, 11, 47, 57, 992371634, time.Local), Count:1, Type:&quot;Normal&quot;, EventTime:time.Date(1, time.January, 1, 0, 0, 0, 0, time.UTC), Series:(*v1.EventSeries)(nil), Action:&quot;&quot;, Related:(*v1.ObjectReference)(nil), ReportingController:&quot;kubelet&quot;, ReportingInstance:&quot;k8s-master01&quot;}&#39;: &#39;Post &quot;https://192.168.66.10:6443/api/v1/namespaces/default/events&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&#39;(may retry after sleeping)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>requesting a signed certificate from the control plane: cannot create certificate signing request: Post &quot;https://192.168.66.10:6443/apis/certificates.k8s.io/v1/certificatesigningrequests&quot;: dial tcp 192.168.66.10:6443: connect: connection refused</span></span>
<span class="line"><span>10月 02 11:53:18 k8s-master01 kubelet[4104]: E1002 11:53:18.618084    4104 controller.go:146] &quot;Failed to ensure lease exists, will retry&quot; err=&quot;Get \\&quot;https://192.168.66.10:6443/apis/coordination.k8s.io/v1/namespaces/kube-node-lease/leases/k8s-master01?timeout=10s\\&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&quot; interval=&quot;7s&quot;</span></span>
<span class="line"><span>10月 02 11:53:18 k8s-master01 kubelet[4104]: I1002 11:53:18.764238    4104 kubelet_node_status.go:70] &quot;Attempting to register node&quot; node=&quot;k8s-master01&quot;</span></span>
<span class="line"><span>10月 02 11:53:18 k8s-master01 kubelet[4104]: E1002 11:53:18.764446    4104 kubelet_node_status.go:92] &quot;Unable to register node with API server&quot; err=&quot;Post \\&quot;https://192.168.66.10:6443/api/v1/nodes\\&quot;: dial tcp 192.168.66.10:6443: connect: connection refused&quot; node=&quot;k8s-master01&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>init] Using Kubernetes version: v1.28.2</span></span>
<span class="line"><span>[preflight] Running pre-flight checks</span></span>
<span class="line"><span>error execution phase preflight: [preflight] Some fatal errors occurred:</span></span>
<span class="line"><span>	[ERROR FileAvailable--etc-kubernetes-manifests-kube-apiserver.yaml]: /etc/kubernetes/manifests/kube-apiserver.yaml already exists</span></span>
<span class="line"><span>	[ERROR FileAvailable--etc-kubernetes-manifests-kube-controller-manager.yaml]: /etc/kubernetes/manifests/kube-controller-manager.yaml already exists</span></span>
<span class="line"><span>	[ERROR FileAvailable--etc-kubernetes-manifests-kube-scheduler.yaml]: /etc/kubernetes/manifests/kube-scheduler.yaml already exists</span></span>
<span class="line"><span>	[ERROR FileAvailable--etc-kubernetes-manifests-etcd.yaml]: /etc/kubernetes/manifests/etcd.yaml already exists</span></span>
<span class="line"><span>	[ERROR Port-10250]: Port 10250 is in use</span></span>
<span class="line"><span>[preflight] If you know what you are doing, you can make a check non-fatal with \`--ignore-preflight-errors=...\`</span></span>
<span class="line"><span>To see the stack trace of this error execute with --v=5 or higher</span></span></code></pre></div><blockquote><ol><li><strong>连接被拒绝</strong>：多次出现<code>dial tcp 192.168.66.10:6443: connect: connection refused</code>错误。这意味着Kubernetes API服务器（kube-apiserver）可能没有正确运行或监听在指定的IP和端口上。</li><li><strong>文件已存在错误</strong>：尝试初始化集群时，kubeadm报告说某些关键的manifest文件已经存在于<code>/etc/kubernetes/manifests/</code>目录下。这通常意味着之前的尝试可能已经在系统中留下了部分配置，导致冲突。</li><li><strong>端口占用</strong>：错误指出<code>Port 10250 is in use</code>，这是kubelet使用的健康检查端口。如果该端口已经被占用，可能需要进一步调查是什么进程占用了这个端口。</li></ol></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>关于 API Server 的状态 当你检查 kube-apiserver 的状态时，得到了“Unit kube-apiserver.service could not be found”的消息。这是因为 kube-apiserver 是作为一个静态 Pod 运行在 kubelet 上的，而不是作为系统服务直接管理的。你可以通过以下命令查看所有静态 Pods 的状态：</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>crictl pods</span></span>
<span class="line"><span>查找包含 kube-apiserver 名称的 Pod 来确认其状态。</span></span>
<span class="line"><span>清理旧的 Kubeconfig 文件 如提示所述，kubeadm reset 不会自动删除 $HOME/.kube/config 文件。如果你之前运行过 kubeadm init 或者有其他配置，应该手动删除或备份这个文件，然后重新生成新的 kubeconfig 文件：</span></span>
<span class="line"><span>Bash</span></span>
<span class="line"><span>编辑</span></span>
<span class="line"><span>rm $HOME/.kube/config</span></span>
<span class="line"><span>mkdir -p $HOME/.kube</span></span>
<span class="line"><span>kubectl --kubeconfig=/etc/kubernetes/admin.conf config use-context kubernetes-admin@kubernetes</span></span>
<span class="line"><span>sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span>sudo chown $(id -u):$(id -g) $HOME/.kube/config</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>to reset your system&#39;s IPVS tables.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>The reset process does not clean your kubeconfig files and you must remove them manually.</span></span>
<span class="line"><span>Please, check the contents of the $HOME/.kube/config file.</span></span>
<span class="line"><span>root@k8s-master01:/home/master# crictl pods</span></span>
<span class="line"><span>POD ID              CREATED             STATE               NAME                NAMESPACE           ATTEMPT             RUNTIME</span></span>
<span class="line"><span>root@k8s-master01:/home/master# rm $HOME/.kube/config</span></span>
<span class="line"><span>rm: cannot remove &#39;/root/.kube/config&#39;: No such file or directory</span></span>
<span class="line"><span>root@k8s-master01:/home/master# mkdir -p $HOME/.kube</span></span>
<span class="line"><span>root@k8s-master01:/home/master# sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config</span></span>
<span class="line"><span>cp: cannot stat &#39;/etc/kubernetes/admin.conf&#39;: No such file or directory</span></span></code></pre></div>`,81)),n("p",null,[s[0]||(s[0]=p("输出：/tmp/k8s_diagnostics_",-1)),a(l),s[1]||(s[1]=p(".tar.gz （包含所有收集文件）",-1))]),s[4]||(s[4]=e(`<p><a href="https://blog.csdn.net/ygd11/article/details/129277208" target="_blank" rel="noreferrer">历尽艰辛的问题：Waiting for the kubelet to boot up the control plane......This can take up to 4m0s-CSDN博客</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>root@k8s-master01:/home/master# kubectl get node</span></span>
<span class="line"><span>E1002 13:05:29.495309    2432 memcache.go:265] couldn&#39;t get current server API group list: Get &quot;http://localhost:8080/api?timeout=32s&quot;: dial tcp 127.0.0.1:8080: connect: connection refused</span></span>
<span class="line"><span>E1002 13:05:29.495561    2432 memcache.go:265] couldn&#39;t get current server API group list: Get &quot;http://localhost:8080/api?timeout=32s&quot;: dial tcp 127.0.0.1:8080: connect: connection refused</span></span>
<span class="line"><span>E1002 13:05:29.499705    2432 memcache.go:265] couldn&#39;t get current server API group list: Get &quot;http://localhost:8080/api?timeout=32s&quot;: dial tcp 127.0.0.1:8080: connect: connection refused</span></span>
<span class="line"><span>E1002 13:05:29.499971    2432 me</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>[sudo] password for master: </span></span>
<span class="line"><span>[reset] Reading configuration from the cluster...</span></span>
<span class="line"><span>[reset] FYI: You can look at this config file with &#39;kubectl -n kube-system get cm kubeadm-config -o yaml&#39;</span></span>
<span class="line"><span>eW1002 13:10:00.561454    2704 reset.go:120] [reset] Unable to fetch the kubeadm-config ConfigMap from cluster: failed to get config map: Get &quot;https://192.168.66.10:6443/api/v1/namespaces/kube-system/configmaps/kubeadm-config?timeout=10s&quot;: dial tcp 192.168.66.10:6443: connect: connection refused</span></span>
<span class="line"><span>W1002 13:10:00.562294    2704 preflight.go:56] [reset] WARNING: Changes made to this host by &#39;kubeadm init&#39; or &#39;kubeadm join&#39; will be reverted.</span></span>
<span class="line"><span>[reset] Are you sure you want to proceed? [y/N]: ^H^H^H^H</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10月 02 13:27:38 k8s-master01 containerd[4468]: time=&quot;2025-10-02T13:27:38.708382930+08:00&quot; level=info msg=&quot;Start cni network conf syncer for default&quot;</span></span>
<span class="line"><span>10月 02 13:27:38 k8s-master01 containerd[4468]: time=&quot;2025-10-02T13:27:38.708386238+08:00&quot; level=info msg=&quot;Start streaming server&quot;</span></span>
<span class="line"><span>root@k8s-master01:/etc/containerd# </span></span>
<span class="line"><span>root@k8s-master01:/etc/containerd# sudo crictl info | grep -A 5 -B 5 &quot;registry\\|systemdCgroup&quot;</span></span>
<span class="line"><span>      &quot;confDir&quot;: &quot;/etc/cni/net.d&quot;,</span></span>
<span class="line"><span>      &quot;maxConfNum&quot;: 1,</span></span>
<span class="line"><span>      &quot;confTemplate&quot;: &quot;&quot;,</span></span>
<span class="line"><span>      &quot;ipPref&quot;: &quot;&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>    &quot;registry&quot;: {</span></span>
<span class="line"><span>      &quot;configPath&quot;: &quot;&quot;,</span></span>
<span class="line"><span>      &quot;mirrors&quot;: {},</span></span>
<span class="line"><span>      &quot;configs&quot;: {},</span></span>
<span class="line"><span>      &quot;auths&quot;: {},</span></span>
<span class="line"><span>      &quot;headers&quot;: {</span></span>
<span class="line"><span>--</span></span>
<span class="line"><span>    &quot;streamServerAddress&quot;: &quot;127.0.0.1&quot;,</span></span>
<span class="line"><span>    &quot;streamServerPort&quot;: &quot;0&quot;,</span></span>
<span class="line"><span>    &quot;streamIdleTimeout&quot;: &quot;4h0m0s&quot;,</span></span>
<span class="line"><span>    &quot;enableSelinux&quot;: false,</span></span>
<span class="line"><span>    &quot;selinuxCategoryRange&quot;: 1024,</span></span>
<span class="line"><span>    &quot;sandboxImage&quot;: &quot;registry.k8s.io/pause:3.6&quot;,</span></span>
<span class="line"><span>    &quot;statsCollectPeriod&quot;: 10,</span></span>
<span class="line"><span>    &quot;systemdCgroup&quot;: false,</span></span>
<span class="line"><span>    &quot;enableTLSStreaming&quot;: false,</span></span>
<span class="line"><span>    &quot;x509KeyPairStreaming&quot;: {</span></span>
<span class="line"><span>      &quot;tlsCertFile&quot;: &quot;&quot;,</span></span>
<span class="line"><span>      &quot;tlsKeyFile&quot;: &quot;&quot;</span></span>
<span class="line"><span>    },</span></span>
<span class="line"><span>root@k8s</span></span></code></pre></div><h1 id="成功安装对应k8s" tabindex="-1">！！！！！成功安装对应k8s <a class="header-anchor" href="#成功安装对应k8s" aria-label="Permalink to &quot;！！！！！成功安装对应k8s&quot;">​</a></h1>`,5)),a(i),s[5]||(s[5]=e(`<p>使用定义对应config</p><p>root@k8s-master01:/home/init# kubeadm version</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kubeadm version: &amp;version.Info{Major:&quot;1&quot;, Minor:&quot;28&quot;, GitVersion:&quot;v1.28.2&quot;, GitCommit:&quot;89a4ea3e1e4ddd7f7572286090359983e0387b2f&quot;, GitTreeState:&quot;clean&quot;, BuildDate:&quot;2023-09-13T09:34:32Z&quot;, GoVersion:&quot;go1.20.8&quot;, Compiler:&quot;gc&quot;, Platform:&quot;linux/amd64&quot;}</span></span></code></pre></div><p>kubeadm version</p><p>同时配置</p><p>结构 下载对应本地镜像 --针对网络延迟导致服务失效</p><p>使用阿里云</p><p>取消swap</p><p>桥接流量</p><p>设置容器 CRIctl控制器 kubelet服务运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>apiVersion: kubeadm.k8s.io/v1beta3</span></span>
<span class="line"><span>bootstrapTokens:</span></span>
<span class="line"><span>- groups:</span></span>
<span class="line"><span>  - system:bootstrappers:kubeadm:default-node-token</span></span>
<span class="line"><span>  token: abcdef.0123456789abcdef</span></span>
<span class="line"><span>  ttl: 24h0m0s</span></span>
<span class="line"><span>  usages:</span></span>
<span class="line"><span>  - signing</span></span>
<span class="line"><span>  - authentication</span></span>
<span class="line"><span>kind: InitConfiguration</span></span>
<span class="line"><span>localAPIEndpoint:</span></span>
<span class="line"><span>  advertiseAddress: 192.168.66.10 //主节点ip</span></span>
<span class="line"><span>  bindPort: 6443</span></span>
<span class="line"><span>nodeRegistration:</span></span>
<span class="line"><span>  criSocket: unix:///var/run/containerd/containerd.sock</span></span>
<span class="line"><span>  imagePullPolicy: IfNotPresent</span></span>
<span class="line"><span>  name: k8s-master01 //主机名 hostname 查看</span></span>
<span class="line"><span>  taints:</span></span>
<span class="line"><span>   - effect: NoSchedule</span></span>
<span class="line"><span>     key: node-role.kubernetes.io/master</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span>apiServer:</span></span>
<span class="line"><span>  timeoutForControlPlane: 4m0s</span></span>
<span class="line"><span>apiVersion: kubeadm.k8s.io/v1beta3</span></span>
<span class="line"><span>certificatesDir: /etc/kubernetes/pki</span></span>
<span class="line"><span>clusterName: kubernetes</span></span>
<span class="line"><span>controllerManager: {}</span></span>
<span class="line"><span>dns: {}</span></span>
<span class="line"><span>etcd:</span></span>
<span class="line"><span>  local:</span></span>
<span class="line"><span>    dataDir: /var/lib/etcd</span></span>
<span class="line"><span>imageRepository: registry.aliyuncs.com/google_containers</span></span>
<span class="line"><span>kind: ClusterConfiguration</span></span>
<span class="line"><span>kubernetesVersion: 1.28.2 //核心 针对主节点镜像的版本</span></span>
<span class="line"><span>//防止远程拉取失败</span></span>
<span class="line"><span></span></span>
<span class="line"><span>//CIDR格式</span></span>
<span class="line"><span>//CIDR（Classless Inter-Domain Routing）表示法由两部分组成：</span></span>
<span class="line"><span>networking:</span></span>
<span class="line"><span>  dnsDomain: cluster.local</span></span>
<span class="line"><span>  podSubnet: 172.7.0.0/16 //网络插件</span></span>
<span class="line"><span>  serviceSubnet: 10.96.0.0/12</span></span>
<span class="line"><span></span></span>
<span class="line"><span>scheduler: {}</span></span>
<span class="line"><span>~</span></span></code></pre></div><p><a href="https://blog.csdn.net/Jerry00713/article/details/126440061?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22126440061%22%2C%22source%22%3A%22Jerry00713%22%7D" target="_blank" rel="noreferrer">kudeadm 部署 k8s_kubedam-CSDN博客</a></p><p>从节点 加载对应模块</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ternatively, if you are the root user, you can run:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  export KUBECONFIG=/etc/kubernetes/admin.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>You should now deploy a pod network to the cluster.</span></span>
<span class="line"><span>Run &quot;kubectl apply -f [podnetwork].yaml&quot; with one of the options listed at:</span></span>
<span class="line"><span>  https://kubernetes.io/docs/concepts/cluster-administration/addons/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Then you can join any number of worker nodes by running the following on each as root:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>kubeadm join 192.168.66.10:6443 --token abcdef.0123456789abcdef \\</span></span>
<span class="line"><span>	--discovery-token-ca-cert-hash sha256:344d6fd9bec10f5c88663d7ffb4c3538cfe8efd184a580cee2a78224b47cef0c </span></span>
<span class="line"><span>root@k8s-master01:/home/init# kubetctl get node</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Command &#39;kubetctl&#39; not found, did you mean:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  command &#39;kubectl&#39; from snap kubectl (1.34.1)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>See &#39;snap info &lt;snapnam/&gt;&#39; for additional versions.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>root@k8s-master01:/home/init# kubectl get node</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>This node has joined the cluster:</span></span>
<span class="line"><span>* Certificate signing request was sent to apiserver and a response was received.</span></span>
<span class="line"><span>* The Kubelet was informed of the new secure connection details.</span></span></code></pre></div><p>加载模块脚本</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -euo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pipefail</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[INFO] 加载 br_netfilter 内核模块...&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">modprobe</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> br_netfilter</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[INFO] 持久化加载 br_netfilter 模块（避免重启后失效）...&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/modules-load.d/k8s.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">br_netfilter</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[INFO] 配置 sysctl 参数...&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">cat/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt; </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/etc/sysctl.d/k8s.conf</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &lt;&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">net.bridge.bridge-nf-call-ip6tables = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">net.bridge.bridge-nf-call-iptables = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">net.ipv4.ip_forward = 1</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[INFO] 应用 sysctl 配置...&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --system</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[INFO] 验证配置...&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [[ $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> net.bridge.bridge-nf-call-iptables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]] &amp;&amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   [[ $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> net.bridge.bridge-nf-call-ip6tables</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]] &amp;&amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   [[ $(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sysctl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -n</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> net.ipv4.ip_forward</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;1&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ]]; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[SUCCESS] Kubernetes 网络前置条件已满足！&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;[ERROR] 配置未生效，请手动检查。&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    exit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fi</span></span></code></pre></div><h2 id="cni-结合部署的对应ip" tabindex="-1">CNI 结合部署的对应ip <a class="header-anchor" href="#cni-结合部署的对应ip" aria-label="Permalink to &quot;CNI 结合部署的对应ip&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 查看当前镜像</span></span>
<span class="line"><span>grep image kube-flannel.yml</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 替换为阿里云镜像（以 v0.25.1 为例）</span></span>
<span class="line"><span>sed -i &#39;s|docker.io/flannel/flannel:.*|registry.aliyuncs.com/google_containers/flannel:v0.25.1|g&#39; kube-flannel.yml</span></span></code></pre></div><p><a href="./.html"></a></p><blockquote><p>networking: dnsDomain: cluster.local podSubnet: 172.7.0.0/16 //网络插件 serviceSubnet: 10.96.0.0/12</p></blockquote><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>10月 02 15:26:32 k8s-master01 kubelet[10841]: E1002 15:26:32.114818   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:26:37 k8s-master01 kubelet[10841]: E1002 15:26:37.116014   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:26:42 k8s-master01 kubelet[10841]: E1002 15:26:42.118353   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:26:47 k8s-master01 kubelet[10841]: E1002 15:26:47.119720   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:26:52 k8s-master01 kubelet[10841]: E1002 15:26:52.121843   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:26:57 k8s-master01 kubelet[10841]: E1002 15:26:57.123354   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;NetworkReady=false reason:NetworkPluginNotReady mes</span></span>
<span class="line"><span>10月 02 15:27:02 k8s-master01 kubelet[10841]: E1002 15:27:02.125403   10841 kubelet.go:2855] &quot;Container runtime network not ready&quot; networkReady=&quot;Netw</span></span></code></pre></div><pre><code>      value: &quot;false&quot;
    image: ghcr.io/flannel-io/flannel:v0.27.3
</code></pre><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>kube-flannel.yml 中定义了：</span></span>
<span class="line"><span>一个 DaemonSet（kind: DaemonSet）</span></span>
<span class="line"><span>一个 ConfigMap（包含 CNI 配置）</span></span>
<span class="line"><span>一个 ServiceAccount 和 RBAC 权限</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set -euo pipefail</span></span>
<span class="line"><span></span></span>
<span class="line"><span>FLANNEL_YAML=&quot;kube-flannel.yml&quot;</span></span>
<span class="line"><span>POD_CIDR=&quot;172.7.0.0/16&quot;</span></span>
<span class="line"><span>ALIYUN_REGISTRY=&quot;registry.aliyuncs.com/google_containers&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 修改 Pod CIDR 为 $POD_CIDR...&quot;</span></span>
<span class="line"><span>sed -i &quot;s|10\\.244\\.0\\.0/16|$POD_CIDR|g&quot; &quot;$FLANNEL_YAML&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 替换镜像为阿里云镜像...&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 替换 flannel 主镜像（ghcr.io/flannel-io/flannel → 阿里云）</span></span>
<span class="line"><span>sed -i &quot;s|ghcr.io/flannel-io/flannel:$.*$|$ALIYUN_REGISTRY/flannel:\\1|g&quot; &quot;$FLANNEL_YAML&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 替换 flannel-cni-plugin 镜像（这个阿里云可能没有，但可尝试用 dockerhub 镜像或保留）</span></span>
<span class="line"><span># 注意：截至 2025 年，阿里云暂未同步 flannel-cni-plugin，但该插件体积小，通常可拉取</span></span>
<span class="line"><span># 如果拉取失败，可手动在各节点拉取或使用代理</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 当前使用的镜像：&quot;</span></span>
<span class="line"><span>grep &quot;image:&quot; &quot;$FLANNEL_YAML&quot; | sort -u</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 部署 Flannel 到集群...&quot;</span></span>
<span class="line"><span>kubectl apply -f &quot;$FLANNEL_YAML&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 等待 Flannel Pod 启动（约 30 秒）...&quot;</span></span>
<span class="line"><span>sleep 10</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 当前 Flannel Pod 状态：&quot;</span></span>
<span class="line"><span>kubectl get pods -n kube-flannel</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[INFO] 节点状态：&quot;</span></span>
<span class="line"><span>kubectl get nodes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>echo &quot;[SUCCESS] Flannel 部署完成！请观察 1 分钟，节点应变为 Ready。&quot;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>结合上下文 每次输入的k8s版本为1-28.02kubeadm version: &amp;version.Info{Major:&quot;1&quot;, Minor:&quot;28&quot;, GitVersion:&quot;v1.28.2&quot;, GitCommit:&quot;89a4ea3e1e4ddd7f7572286090359983e0387b2f&quot;, GitTreeState:&quot;clean&quot;, BuildDate:&quot;2023-09-13T09:34:32Z&quot;, GoVersion:&quot;go1.20.8&quot;, Compiler:&quot;gc&quot;, Platform:&quot;linux/amd64&quot;}，使用contain容器，本地已安装好yaml文件，继续完善</span></span></code></pre></div><p>CNI每个镜像都挺有</p><p>scp传输</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 导入 flannel 主镜像</span></span>
<span class="line"><span>ctr -n k8s.io images import ./flannel.tar</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 导入 cni-plugin 镜像</span></span>
<span class="line"><span>ctr -n k8s.io images import ./flannel-cni-plugin.tar</span></span></code></pre></div><p>每个kubelet都需要进行部署文件 配置servie</p><blockquote><p>是的，<strong>完全可以保证不包含主节点（master/control-plane）特有内容</strong> —— 只需<strong>排除仅 master 节点才需要的参数</strong>。</p><hr><h3 id="✅-主节点-vs-从节点-关键区别" tabindex="-1">✅ 主节点 vs 从节点：关键区别 <a class="header-anchor" href="#✅-主节点-vs-从节点-关键区别" aria-label="Permalink to &quot;✅ 主节点 vs 从节点：关键区别&quot;">​</a></h3><table tabindex="0"><thead><tr><th>参数</th><th>主节点（Master）</th><th>从节点（Worker）</th><th>是否应包含在 worker 的 service 文件中？</th></tr></thead><tbody><tr><td><code>--pod-manifest-path=/etc/kubernetes/manifests</code></td><td>✅ 用于运行静态 Pod（如 kube-apiserver）</td><td>❌ worker 不运行 control-plane 组件</td><td><strong>❌ 不应包含</strong></td></tr><tr><td><code>--register-with-taints=node-role.kubernetes.io/master:NoSchedule</code></td><td>✅ 主节点专用污点</td><td>❌ worker 不需要</td><td><strong>❌ 不应包含</strong></td></tr><tr><td><code>--node-labels=node-role.kubernetes.io/master</code></td><td>✅ 主节点标签</td><td>❌</td><td><strong>❌ 不应包含</strong></td></tr><tr><td><code>--bootstrap-kubeconfig</code></td><td>✅ 首次加入时需要（master/worker 都有）</td><td>✅ worker 加入集群时也需要</td><td><strong>✅ 应保留</strong></td></tr><tr><td><code>--kubeconfig</code></td><td>✅</td><td>✅</td><td><strong>✅ 保留</strong></td></tr><tr><td><code>--config</code></td><td>✅</td><td>✅</td><td><strong>✅ 保留</strong></td></tr><tr><td><code>--container-runtime-endpoint</code></td><td>✅</td><td>✅</td><td><strong>✅ 保留</strong></td></tr><tr><td><code>--pod-infra-container-image</code></td><td>可选</td><td>可选（但你正要加）</td><td><strong>✅ 按需添加</strong></td></tr></tbody></table><p>/&gt; 📌 <strong>结论</strong>：只要<strong>不写 <code>--pod-manifest-path</code> 和 master 专属标签/污点</strong>，就是干净的 worker 配置。</p><hr><h3 id="✅-纯净的从节点-kubelet-service-无任何-master-内容" tabindex="-1">✅ 纯净的从节点 <code>kubelet.service</code>（无任何 master 内容） <a class="header-anchor" href="#✅-纯净的从节点-kubelet-service-无任何-master-内容" aria-label="Permalink to &quot;✅ 纯净的从节点 \`kubelet.service\`（无任何 master 内容）&quot;">​</a></h3><div class="language-ini vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ini</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># /etc/systemd/system/kubelet.service</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[Unit]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Description</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=kubelet: The Kubernetes Node Agent</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Documentation</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=https://kubernetes.io/docs/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Wants</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=network-online.target</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">After</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=network-online.target</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[Service]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">ExecStart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=/usr/bin/kubelet \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  --</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">bootstrap-kubeconfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=/etc/kubernetes/bootstrap-kubelet.conf \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  --</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">kubeconfig</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=/etc/kubernetes/kubelet.conf \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  --</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=/var/lib/kubelet/config.yaml \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  --</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">container-runtime-endpoint</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=unix:///run/containerd/containerd.sock \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  --</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">pod-infra-container-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=registry.aliyuncs.com/google_containers/pause:3.9</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">Restart</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=always</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RestartSec</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=10</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">StartLimitInterval</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">KillMode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=process</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">[Install]</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WantedBy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=multi-user.target</span></span></code></pre></div><p>✅ <strong>这个配置：</strong></p><ul><li><strong>没有</strong> <code>--pod-manifest-path</code>（worker 不需要静态 Pod）</li><li><strong>没有</strong> 任何 master 标签、污点、control-plane 参数</li><li><strong>保留了</strong> worker 必需的认证和配置路径</li><li><strong>添加了</strong>你需要的 pause 镜像替换</li></ul><hr><h3 id="🔍-验证是否-干净" tabindex="-1">🔍 验证是否“干净” <a class="header-anchor" href="#🔍-验证是否-干净" aria-label="Permalink to &quot;🔍 验证是否“干净”&quot;">​</a></h3><p>你可以在一个已加入集群的 worker 节点上执行：</p><div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 查看当前 kubelet 实际启动参数（由 kubeadm 默认生成）</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">ps</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> aux</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubelet</span></span></code></pre></div><p>你会发现默认的 worker kubelet <strong>本来就没有 <code>--pod-manifest-path</code></strong>，所以我们的配置是准确的。</p><hr><h3 id="🛠️-最终建议" tabindex="-1">🛠️ 最终建议 <a class="header-anchor" href="#🛠️-最终建议" aria-label="Permalink to &quot;🛠️ 最终建议&quot;">​</a></h3><ul><li><strong>使用上述纯净版 service 文件覆盖从节点的 <code>/etc/systemd/system/kubelet.service</code></strong></li><li>执行：<div class="language-bash vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> daemon-reload</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> restart</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> kubelet</span></span></code></pre></div></li><li>之后可通过 <code>kubectl get node &lt;worker-nam/&gt; -o wide</code> 确认节点仍处于 <code>Ready</code> 状态</li></ul><p>/&gt; ✅ 这样既解决了 pause 镜像拉取问题，又<strong>完全避免了主节点专属配置污染</strong>，安全且符合最佳实践。</p></blockquote><p><a href="https://blog.csdn.net/jiuyanjin5740/article/details/146369614" target="_blank" rel="noreferrer">Kubernetes Pod Network CIDR_pod-network-cidr-CSDN博客</a></p><p><a href="https://www.bookstack.cn/read/kubernetes-handbook-201910/concepts-persistent-volume.md" target="_blank" rel="noreferrer">https://www.bookstack.cn/read/kubernetes-handbook-201910/concepts-persistent-volume.md</a></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span># 2. 创建静态 PV</span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: PersistentVolume</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: pv-test-volume</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  capacity:</span></span>
<span class="line"><span>    storage: 1Gi              # PV 容量</span></span>
<span class="line"><span>  accessModes:</span></span>
<span class="line"><span>    - ReadWriteOnce           # 单节点可读写</span></span>
<span class="line"><span>  persistentVolumeReclaimPolicy: Retain  # 测试后可保留数据</span></span>
<span class="line"><span>  storageClassName: manual               # 使用手动类型</span></span>
<span class="line"><span>  hostPath:                             # 使用宿主机路径（本地测试常用）</span></span>
<span class="line"><span>    path: /mnt/data/pv-test-volume</span></span>
<span class="line"><span>    type: DirectoryOrCreate</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span># 3. 创建 PVC（绑定 PV）</span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: PersistentVolumeClaim</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: pvc-test-claim</span></span>
<span class="line"><span>  namespace: linhaixin</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  accessModes:</span></span>
<span class="line"><span>    - ReadWriteOnce</span></span>
<span class="line"><span>  storageClassName: manual               # 必须与 PV 的 storageClassName 对应</span></span>
<span class="line"><span>  resources:</span></span>
<span class="line"><span>    requests:</span></span>
<span class="line"><span>      storage: 500Mi                     # 请求小于等于 PV 容量即可</span></span>
<span class="line"><span>  volumeName: pv-test-volume             # 指定绑定哪个 PV</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span># 4. 创建 Pod 挂载 PVC 并写入数据测试</span></span>
<span class="line"><span># =========================</span></span>
<span class="line"><span>apiVersion: v1</span></span>
<span class="line"><span>kind: Pod</span></span>
<span class="line"><span>metadata:</span></span>
<span class="line"><span>  name: pv-pvc-test-pod</span></span>
<span class="line"><span>  namespace: pv-test</span></span>
<span class="line"><span>spec:</span></span>
<span class="line"><span>  containers:</span></span>
<span class="line"><span>  - name: linhaixin.registry/linhaixin/busybox:v1.0</span></span>
<span class="line"><span>    image: </span></span>
<span class="line"><span>    command: [&quot;/bin/sh&quot;, &quot;-c&quot;]</span></span>
<span class="line"><span>    args: [&quot;echo &#39;hello-pv-pvc&#39;/&gt; /data/test.txt &amp;&amp; sleep 3600&quot;]</span></span>
<span class="line"><span>    volumeMounts:</span></span>
<span class="line"><span>      - mountPath: /data</span></span>
<span class="line"><span>        name: test-volume</span></span>
<span class="line"><span>  volumes:</span></span>
<span class="line"><span>  - name: test-volume</span></span>
<span class="line"><span>    persistentVolumeClaim:</span></span>
<span class="line"><span>      claimName: pvc-test-claim</span></span></code></pre></div><blockquote></blockquote>`,35))])}const q=o(d,[["render",h]]);export{v as __pageData,q as default};
