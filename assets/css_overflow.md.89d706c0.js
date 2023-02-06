import{_ as e,c as s,o as a,b as o}from"./app.517b8ad5.js";const f=JSON.parse('{"title":"overflow的hidden和visible失效","description":"","frontmatter":{"layout":"doc","title":"overflow的hidden和visible失效"},"headers":[{"level":2,"title":"问题","slug":"问题","link":"#问题","children":[]},{"level":2,"title":"解决方法","slug":"解决方法","link":"#解决方法","children":[]}],"relativePath":"css/overflow.md"}'),n={name:"css/overflow.md"},l=o(`<h1 id="overflow-的-hidden-和-visible-在同一个元素使用失效" tabindex="-1">overflow 的 hidden 和 visible 在同一个元素使用失效 <a class="header-anchor" href="#overflow-的-hidden-和-visible-在同一个元素使用失效" aria-hidden="true">#</a></h1><h2 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-hidden="true">#</a></h2><p>当我对一个 swiper 列表增加一个 button 绝对定位并且超出了父元素的高度，理想状况下，在 X 轴超出部分隐藏，Y 轴超出部分显示。然而，元素属性并没有生效。</p><div class="info custom-block"><p class="custom-block-title"><a href="https://www.w3.org/TR/css-box-3/#overflow-x" target="_blank" rel="noreferrer">W3C</a></p><p>The computed values of ‘overflow-x’ and ‘overflow-y’ are the same as their specified values, except that some combinations with ‘visible’ are not possible: if one is specified as ‘visible’ and the other is ‘scroll’ or ‘auto’, then ‘visible’ is set to ‘auto’. The computed value of ‘overflow’ is equal to the computed value of ‘overflow-x’ if ‘overflow-y’ is the same; otherwise it is the pair of computed values of ‘overflow-x’ and ‘overflow-y’.</p></div><p>大概意思是 overflow-x 和 overflow-y 会进行同步设置,无法分开设置其中一个</p><h2 id="解决方法" tabindex="-1">解决方法 <a class="header-anchor" href="#解决方法" aria-hidden="true">#</a></h2><p>在目标元素外再包裹一层元素 css 加上以下属性</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">padding-bottom</span><span style="color:#A6ACCD;">: </span><span style="color:#FFCB6B;">button-height</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#FFCB6B;">margin-bottom</span><span style="color:#A6ACCD;">: </span><span style="color:#FFCB6B;">button-height</span><span style="color:#A6ACCD;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">overflow: hidden;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>目标元素 swiper</p><div class="language-css line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">overflow: visible;</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,10),i=[l];function t(r,p,c,d,h,v){return a(),s("div",null,i)}const b=e(n,[["render",t]]);export{f as __pageData,b as default};
