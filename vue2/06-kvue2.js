/**
 * KVue2 和 KVue1主要的区别
 * 1.没有编译Compiler，增加$mount方法
 * 2.增加watcher和updateComponent，new Watcher的时候会调用updateComponent
 * 3.render函数是通过编译器vue-loader编译的
 *
 *
 * */
function defineReactive(obj, key, val) {
  observe(val);

  // 每个key对应一个dep
  // 虽然这里new 了很多个dep，但是Dep.target是在get函数里面被赋值的，如果不new WACTHER的时候，永远没有办法addDep的
  // 所以这里的dep。target只能是component的watcher实例
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    // 这个地方闭包了，创建的dep就可以在内存中驻留
    get() {
      // console.log('get');
      // 收集依赖，如果Dep.target
      // new Watcher的时候把this赋值给了Dep.target
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(v) {
      if (v !== val) {
        // console.log('set');
        val = v;
        // 创建Dep更新
        // watchers.forEach(w=>w.update())
        dep.notify();
      }
    },
  });
}

function observe(obj) {
  if (Object.prototype.toString.call(obj) !== "[object Object]") {
    return;
  }

  new Observe(obj);
}

class Observe {
  constructor(obj) {
    this.value = obj;
    if (Array.isArray(obj)) {
      // todo 数组
    } else {
      // 对象
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function proxy(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}

class KVue {
  constructor(options) {
    this.options = options;
    // 1.observe
    this.$data = options.data;
    observe(this.$data);
    // 代理
    proxy(this);

    // 2.compile
    // 参数1：当前宿主
    // 参数2：this
    // new Compile(options.el, this);

    // 如果有el，就会执行挂载
    if (options.el) {
      this.$mount(options.el);
    }
  }
  // KVue初始化完成之后就可以调用$mount
  $mount(el) {
    // 获取宿主
    this.$el = document.querySelector(el);
    // 在$mount中执行updateComponent方法，传进来一个render
    // 任何数据发生变化这个函数都会再次执行
    const updateComponent = () => {
      const { render } = this.options;

      // 获取当前元素和父级元素,执行render方法，获取vnode,原始dom
      //   const el = render.call(this);
      //   const parent = this.$el.parentElement;
      //   parent.insertBefore(el, this.$el.nextSibling);
      //   parent.removeChild(this.$el);

      // 虚拟dom,调用render获取vnode
      const vnode = render.call(this, this.$createElement);
      this._update(vnode);
      this.$el = el;
    };
    new Watcher(this, updateComponent);
  }

  $createElement(tag, props, children) {
    return { tag, props, children };
  }

  // vnode做patch转换为真实dom
  _update(vnode) {
    //  判断有没有上一次执行的vnode，为了patch
    const prevVnode = this._vnode;
    if (!prevVnode) {
      // 初始化
      this.__patch__(this.$el, vnode);
    } else {
      // 更新
      this.__patch__(prevVnode, vnode);
    }
  }

  __patch__(oldVNode, vnode) {
    if (oldVNode.nodeType) {
      // 初始化
      // 获取父元素
      const parent = oldVNode.parentElement;
      // 获取兄弟节点
      const refElm = oldVNode.nextSibling;
      // 递归创建整棵树
      const el = this.createElm(vnode);
      parent.insertBefore(el, refElm);
      parent.removeChild(oldVNode);
    } else {
      // 获取真实dom
      const el = (vnode.el = oldVNode.el);
      // 更新过程
      // props更新
      const oldProps = oldVNode.props || {};
      const newProps = vnode.props || {};

      // 1.更新
      for (let key in newProps) {
        if (oldProps[key] !== newProps[key]) {
          el.setAttribute(key, newProps[key]);
        }
      }
      // 删除
      for (let key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key);
        }
      }
      // children更新
      const oldCh = oldVNode.children;
      const newCh = vnode.children;
      // text ：如果不相同，就直接纯文本更新
      if (typeof newCh === "string") {
        if (typeof oldCh === "string") {
          // 纯文本更新
          if (oldCh !== newCh) {
            el.textContent = newCh;
          }
        } else {
          el.textContent = newCh;
        }
      } else {
        // children array
        if (typeof oldCh == "string") {
          // 清空，创建新节点
          el.innerHTML = "";
          newCh.forEach((child) => {
            el.appendChild(this.createElm(child));
          });
        } else {
          // 重排
          this.updateChildren(el, oldCh, newCh);
        }
      }
    }
    // 保存最新的虚拟dom,方便patch，prevVnode就是this._vnode,就是patch的oldVNode
    this._vnode = vnode;
  }
  // 重排
  updateChildren(el, oldCh, newCh) {
    //   强行更新
    let len = Math.min(oldCh.length, newCh.length);
    for (let i = 0; i < len; i++) {
      this.__patch__(oldCh[i], newCh[i]);
    }

    // newCh如果是更长的，说明有新增
    if (newCh.length > oldCh.length) {
      newCh.slice(len).forEach((child) => {
        const el = this.createElm(child);
        el.appendChild(el);
      });
    } else if (newCh.length < oldCh.length) {
      // oldCh如果更长，说明要删除
      oldCh.slice(len).forEach((child) => {
        el.removeChild(child.el);
      });
    }
  }

  createElm(vnode) {
    const el = document.createElement(vnode.tag);
    // data
    // props
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key];
        el.setAttribute(key, value);
      }
    }
    // children
    if (vnode.children) {
      if (typeof vnode.children === "string") {
        // text
        el.textContent = vnode.children;
      } else {
        // children array
        vnode.children.forEach((vvnode) => {
          const child = this.createElm(vvnode);
          el.appendChild(child);
        });
      }
    }

    // 保存创建真实dom
    vnode.el = el;
    return el;
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$vm.modelNode = [];
    // 遍历el
    this.$el = document.querySelector(el);
    this.compile(this.$el);
  }

  compile(el) {
    el.childNodes.forEach((node) => {
      if (node.nodeType == 1) {
        // 1.元素 p div
        console.log("编译元素", node.nodeName);

        // 元素的处理是处理属性
        this.compileElement(node);
        // 递归元素里面的内容
        if (node.childNodes.length > 0) {
          this.compile(node);
        }
      } else if (this.isInter(node)) {
        // 2.插值绑定 {{xxx}}
        console.log("编译文本", node.textContent);
        // 插值文本编译
        this.compileText(node);
      }
    });
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isDir(attrName) {
    return attrName.startsWith("k-");
  }

  isEvent(attrName) {
    return attrName.startsWith("@");
  }

  // 给传入的node做初始化并创建watcher负责更新
  update(node, exp, dir) {
    // 1.初始化
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp], exp, this);
    // 2.创建watcher实例
    // 形成了新的闭包，创建watcher重新更新
    // 这里的函数相当于watcher里面的updateFn
    new Watcher(this.$vm, exp, (val) => {
      fn && fn(node, val, exp, this);
    });
  }

  // 编译文本的最终函数，插值文本和k-text是一回事
  compileText(node) {
    // 初始化节点并更新函数，即创建watcher，未来我更新之后，初始化的时候按什么方式操作，和指定名称相关
    this.update(node, RegExp.$1, "text");
    // [RegExp.$1]相当于data里的counter
    // node.textContent = this.$vm[RegExp.$1]
  }

  textUpdater(node, val) {
    node.textContent = val;
  }

  htmlUpdater(node, val) {
    node.innerHTML = val;
  }

  modelUpdater(node, val) {
    // 表单元素赋值
    node.value = val;
  }

  // 编译元素的最终函数
  compileElement(node) {
    // 伪数组
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach((attr) => {
      // attr  k-text=xx
      const attrName = attr.name; // k-text
      const exp = attr.value; // xx
      // 判断是不是k-开头
      if (this.isDir(attrName)) {
        // 指令
        // 每一个data里的属性已经做了代理到$vm上，就是Vue实例上，所以$vm[exp]就是对应的值
        // 思路：把每个attrName后面的部分取出来，如果有的话就直接执行对应的k-后面的同名函数
        const dir = attrName.slice(2);
        this[dir] && this[dir](node, exp);
      } else if (this.isEvent(attrName)) {
        // 判断是不是@开头
        const dir = attrName.slice(1);
        // this[dir] && this[dir](node,exp)
        this.eventHandler(node, exp, dir);
      }
    });
  }

  // k-text
  text(node, exp) {
    // exp是counter。this.$vm[exp]就是counter的值，通过代理已经存到根实例上了
    // node.textContent = this.$vm[exp]
    this.update(node, exp, "text");
  }

  // k-html
  html(node, exp) {
    // node.innerHTML=this.$vm[exp]
    this.update(node, exp, "html");
  }

  // k-model
  model(node, exp) {
    this.update(node, exp, "model");

    // 事件监听
    // 将新的值赋值给数据即可
    node.addEventListener(
      "input",
      (e) => {
        this.$vm[exp] = e.target.value;
      },
      false
    );
  }

  // @事件监听
  eventHandler(node, exp, dir) {
    const method = this.$vm.options.methods[exp];
    node.addEventListener(dir, method.bind(this.$vm));
  }

  // 想要更新，给页面上所有动态的部分都找到，依赖收集，给每个动态的部分创建一个watcher，管理起来，然后把每个watcher加到每个key对应的Dep中
  // 如果更新，让Dep通知更新
}

// 侦听器：负责页面中一个依赖的更新
// const watchers = []
// 1
class Watcher {
  // 参数1：vue实例
  // 参数2：data的key
  // 参数3：更新函数
  constructor(vm, fn) {
    this.vm = vm;
    // watchers.push(this)
    // this.getter就是updateComponent
    this.getter = fn;
    // 创建watcher的时候获取一个key的值，为了触发get方法
    // 创建watcher实例和dep之间的映射关系
    this.get();
  }
  get() {
    // 把这个watcher当做Dep的target，为了和Dep之间建立关系
    Dep.target = this;
    this.getter.call(this.vm);
    Dep.target = null;
  }
  update() {
    // this.vm作为上下文指定到updateFn里面，方便获取值
    // 传的值是vm里面获取的最新的值 this.vm[this.key]
    // 在编译器里面发现一个动态的值就要创建一个watcher
    // 插值绑定和指定都属于动态的值，不能每个里面都写一遍，封装为一个函数
    // 怕上下文会改变
    // this.updateFn.call(this.vm, this.vm[this.key]);
    // this.updateFn(this.vm[this.key])
    this.get();
  }
}

// 一个watcher多个dep
class Dep {
  constructor() {
    // Set集合不会重复，不会重复依赖
    this.deps = new Set();
  }
  //  这里添加的dep就是watcher的实例
  addDep(dep) {
    this.deps.add(dep);
  }
  //   set的时候调用的是dep.notify,所有watcher实例的更新
  notify() {
    // 所有管理的watcher都更新
    this.deps.forEach((dep) => dep.update());
  }
}

// 所有动态的部分都要调用update函数，初始化+更新
// 更新就是创建watcher，创建watcher的时候就要触发get
// watcher当前的实例this放在Dep.target上，这是一个静态属性
// 执行get的时候判断就是存在target的，而是这个target就是watcher，这个watcher就被加达到dep里面了
