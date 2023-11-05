import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{r as c,o,c as l,b as d,a as n,d as e,e as a,f as t}from"./app-d4c211ae.js";const r="/assets/dockerFun_1_HelloWorld-0fb09aca.png",p={},u=n("p",null,"部署一个个人主页的Docker项目，在容器内部通过Nginx静态资源服务器实现资源访问。",-1),m=n("h2",{id:"前置条件",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#前置条件","aria-hidden":"true"},"#"),e(" 前置条件")],-1),v=n("li",null,[n("strong",null,"Linux系统"),e("，笔者使用阿里云轻量应用服务器(Ubuntu20.04)。")],-1),h=n("strong",null,"Docker环境",-1),b={href:"https://yeasy.gitbook.io/docker_practice/install/ubuntu",target:"_blank",rel:"noopener noreferrer"},k=n("strong",null,"打包好的网页静态资源",-1),g=n("code",null,"Vite",-1),f={href:"https://github.com/xmerge/docker_my-vue-app.git",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"Vue",-1),x=t(`<h2 id="_1-制作镜像" tabindex="-1"><a class="header-anchor" href="#_1-制作镜像" aria-hidden="true">#</a> 1. 制作镜像</h2><ol><li><p>运行以下脚本，克隆打包后的静态资源（<code>HelloWolrd</code>资源，供学习使用）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建 my-docker-app 文件夹并进入</span>
<span class="token function">sudo</span> <span class="token function">mkdir</span> my-docker-app <span class="token operator">&amp;&amp;</span> <span class="token builtin class-name">cd</span> my-docker-app
<span class="token comment">## 克隆git仓库并命名为dist</span>
<span class="token function">git</span> clone https://github.com/xmerge/docker_my-vue-app.git dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>在<code>my-docker-app</code>文件夹下，创建一个<code>Dockerfile</code>文件和一个<code>nginx.conf</code>文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment">## 创建Dockerfile</span>
<span class="token function">sudo</span> <span class="token function">touch</span> Dockerfile
<span class="token comment">## 创建nginx.conf</span>
<span class="token function">sudo</span> <span class="token function">touch</span> nginx.conf
<span class="token comment">## 编写Dockerfile</span>
<span class="token function">sudo</span> <span class="token function">vim</span> Dockerfile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning"><p class="hint-container-title">文件目录</p><p><code>Dockerfile</code>文件, <code>nginx.conf</code>文件和<code>dist</code>文件夹都在<code>my-docker-app</code>目录下， 三者是平级关系。</p></div></li><li><p>编写<code>Dockerfile</code>和<code>nginx.conf</code></p><p>Dockerfile编写如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>FROM nginx:alpine
COPY dist/ /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE <span class="token number">8888</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上<code>Dockerfile</code>解释如下：</p><ul><li><code>FROM nginx:alpine</code>: 这个语句指定了使用哪个基础镜像。这里是使用名为nginx,标签为alpine的镜像作为基础镜像。这将使用一个轻量级的nginx镜像作为构建的基础。</li><li><code>COPY dist/ /usr/share/nginx/html</code>: COPY语句将本地目录dist中的所有文件,复制到容器内部路径/usr/share/nginx/html下。这是nginx默认的网站根目录。</li><li><code>COPY nginx.conf /etc/nginx/conf.d/default.conf</code>: COPY语句将本地的nginx.conf文件复制到容器内的/etc/nginx/conf.d/default.conf路径。这个路径包含nginx的配置文件。</li><li><code>EXPOSE 8888</code>: EXPOSE语句将容器内的8888端口暴露出来，这允许外部访问容器的8888端口。<strong>注意这个并不会自动在宿主机开放这个端口</strong>,在docker run时还需用-p参数来发布端口。</li></ul><p>nginx.conf编写如下:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>server <span class="token punctuation">{</span>
    listen <span class="token number">8888</span><span class="token punctuation">;</span>
    server_name localhost<span class="token punctuation">;</span>

    root /usr/share/nginx/html<span class="token punctuation">;</span>
    index index.html<span class="token punctuation">;</span>

    location / <span class="token punctuation">{</span>
        try_files <span class="token variable">$uri</span> <span class="token variable">$uri</span>/ /index.html<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以上<code>nginx.conf</code>解释如下：</p></li><li><p>构建镜像</p><p>在终端中运行以下命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> build <span class="token parameter variable">-t</span> my-docker-app <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ol><h2 id="_2-尝试访问" tabindex="-1"><a class="header-anchor" href="#_2-尝试访问" aria-hidden="true">#</a> 2. 尝试访问</h2><p>在终端中运行以下命令:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">docker</span> run <span class="token parameter variable">-p</span> <span class="token parameter variable">-d</span> <span class="token number">8888</span>:8888 my-docker-app
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>访问<code>localhost:8888</code>，即可看到运行中的<code>my-docker-app</code>提供的页面：<br><img src="`+r+'" alt="HelloWord页面" loading="lazy"></p><p>恭喜你，已经完成配置！</p><h2 id="_3-踩坑记录" tabindex="-1"><a class="header-anchor" href="#_3-踩坑记录" aria-hidden="true">#</a> 3. 踩坑记录</h2><ol><li>nginx配置目录</li></ol>',9);function y(D,O){const s=c("ExternalLinkIcon");return o(),l("div",null,[u,d(" more "),m,n("ol",null,[v,n("li",null,[h,e("，"),n("a",b,[e("国内用户安装教程"),a(s)])]),n("li",null,[k,e("，笔者使用一个通过"),g,e("打包的"),n("a",f,[_,e("项目"),a(s)]),e("。")])]),x])}const C=i(p,[["render",y],["__file","dockerFun_1.html.vue"]]);export{C as default};
