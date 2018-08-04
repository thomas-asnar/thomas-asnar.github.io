define(["./my-app.js"],function(_myApp){"use strict";function _templateObject_9dd3bdd0982d11e8b9d1ef57f1182430(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style include=\"shared-styles\">\n    :host {\n      display: grid;\n      grid-template-columns:1fr 1fr;\n      padding: 10px;\n    }\n    #view-result{\n      grid-column:span 2;\n    }\n  </style>\n  \n  <div class=\"card\" id=\"view-result\">\n    <pre><code>job1;luke;\njob2;leia;\njob3;anakin;\njob4;darkvador;\njob5;yoda;</code></pre>\n  </div>\n  <div class=\"card\" id=\"view-uploadxml\">\n  <pre>&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;\n  &lt;root&gt;\n  &lt;job name=\"job1\"&gt;luke&lt;/job&gt;\n  &lt;job name=\"job2\"&gt;leia&lt;/job&gt;\n  &lt;job name=\"job3\"&gt;anakin&lt;/job&gt;\n  &lt;job name=\"job4\"&gt;darkvador&lt;/job&gt;\n  &lt;job name=\"job5\"&gt;yoda&lt;/job&gt;\n  &lt;/root&gt;</code></pre>\n  </div>\n  <div class=\"card\" id=\"view-uploadxslt\">\n    <pre><code>&lt;xsl:stylesheet version=\"2.0\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"&gt;\n    &lt;xsl:output method=\"text\" encoding=\"utf-8\" /&gt;\n    \n    &lt;xsl:param name=\"delimCSV\" select=\"';'\" /&gt;\n    &lt;xsl:param name=\"delimParam\" select=\"'|'\" /&gt;\n    &lt;xsl:param name=\"break\" select=\"'&amp;#xA;'\" /&gt;\n  \n    &lt;xsl:template match=\"/\"&gt;\n      &lt;xsl:apply-templates select=\"root/job\" /&gt;\n    &lt;/xsl:template&gt;\n  \n    &lt;!-- All Job node for root node --&gt;\n    &lt;xsl:template match=\"root/job\"&gt;\n      &lt;xsl:value-of select=\"@name\" /&gt;\n      &lt;xsl:value-of select=\"$delimCSV\" /&gt;\n      &lt;xsl:value-of select=\"text()\" /&gt;\n      &lt;xsl:value-of select=\"$delimCSV\" /&gt;\n      &lt;xsl:value-of select=\"$break\" /&gt;\n    &lt;/xsl:template&gt;\n  \n  &lt;/xsl:stylesheet&gt;</code></pre>\n  </div>\n    "]);_templateObject_9dd3bdd0982d11e8b9d1ef57f1182430=function(){return data};return data}var MyView2=function(_PolymerElement){babelHelpers.inherits(MyView2,_PolymerElement);function MyView2(){babelHelpers.classCallCheck(this,MyView2);return babelHelpers.possibleConstructorReturn(this,(MyView2.__proto__||Object.getPrototypeOf(MyView2)).apply(this,arguments))}babelHelpers.createClass(MyView2,null,[{key:"template",get:function get(){return(0,_myApp.html)(_templateObject_9dd3bdd0982d11e8b9d1ef57f1182430())}}]);return MyView2}(_myApp.PolymerElement);window.customElements.define("my-view2",MyView2)});