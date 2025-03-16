// 文本编辑功能脚本
// 使所有文本元素可编辑

// 确认脚本已加载
console.log('可编辑文本脚本已加载 - ' + new Date().toLocaleString());

// 在浏览器控制台中显示初始化消息
(function() {
    // 创建调试信息
    const debugInfo = document.createElement('div');
    debugInfo.id = 'debug-info';
    debugInfo.style.position = 'fixed';
    debugInfo.style.bottom = '10px';
    debugInfo.style.right = '10px';
    debugInfo.style.padding = '5px';
    debugInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    debugInfo.style.color = 'white';
    debugInfo.style.fontSize = '12px';
    debugInfo.style.zIndex = '9999';
    debugInfo.style.display = 'none'; // 默认隐藏
    debugInfo.textContent = '编辑功能已初始化';
    
    // 添加双击显示/隐藏调试信息的功能
    document.addEventListener('dblclick', function(e) {
        if (e.ctrlKey) { // 需要按住Ctrl键才能显示
            debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // 页面加载后添加调试信息
    window.addEventListener('load', function() {
        document.body.appendChild(debugInfo);
    });
})();

// 主函数：使页面上的所有文本元素变为可编辑状态
function makeAllTextEditable() {
    // 添加编辑模式开关按钮
    addEditModeToggle();
    
    // 获取所有可能包含文本的元素
    const textElements = document.querySelectorAll('div, span, td, p, h1, h2, h3, h4, h5, h6');
    
    textElements.forEach(element => {
        // 跳过已经是可编辑的元素
        if (element.getAttribute('contenteditable') === 'true') {
            return;
        }
        
        // 跳过特定的功能性按钮和容器
        if (element.id === 'editModeToggle' || 
            element.id === 'saveButton' || 
            element.id === 'resetButton' ||
            element.id === 'infoBox' ||
            element.className === 'bgc' ||
            element.tagName.toLowerCase() === 'script' ||
            element.tagName.toLowerCase() === 'style') {
            return;
        }
        
        // 标记元素为可编辑（初始状态为不可编辑）
        element.setAttribute('contenteditable', 'false');
        element.classList.add('editable-element');
        
        // 保存原始文本
        element.setAttribute('data-original-text', element.innerText);
        
        // 添加编辑样式
        element.addEventListener('focus', function() {
            this.style.outline = '2px dashed #0099FF';
            this.style.padding = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.padding = '0';
        });
    });
    
    console.log('所有文本元素已准备好进行编辑');
}

// 添加编辑模式开关按钮
function addEditModeToggle() {
    // 检查是否已经存在编辑开关
    if (document.getElementById('editModeToggle')) {
        return;
    }
    
    // 创建控制面板容器
    const controlPanel = document.createElement('div');
    controlPanel.id = 'editControlPanel';
    controlPanel.style.position = 'fixed';
    controlPanel.style.top = '10px';
    controlPanel.style.right = '10px';
    controlPanel.style.zIndex = '1000';
    controlPanel.style.display = 'flex';
    controlPanel.style.gap = '5px';
    
    // 创建编辑模式开关按钮
    const toggleButton = document.createElement('button');
    toggleButton.id = 'editModeToggle';
    toggleButton.innerText = '开启编辑';
    toggleButton.style.padding = '8px 15px';
    toggleButton.style.backgroundColor = '#4CAF50';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '4px';
    toggleButton.style.cursor = 'pointer';
    
    // 创建保存按钮（初始隐藏）
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.innerText = '保存更改';
    saveButton.style.padding = '8px 15px';
    saveButton.style.backgroundColor = '#2196F3';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.borderRadius = '4px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.display = 'none';
    
    // 创建重置按钮（初始隐藏）
    const resetButton = document.createElement('button');
    resetButton.id = 'resetButton';
    resetButton.innerText = '重置文本';
    resetButton.style.padding = '8px 15px';
    resetButton.style.backgroundColor = '#f44336';
    resetButton.style.color = 'white';
    resetButton.style.border = 'none';
    resetButton.style.borderRadius = '4px';
    resetButton.style.cursor = 'pointer';
    resetButton.style.display = 'none';
    
    // 添加按钮到控制面板
    controlPanel.appendChild(toggleButton);
    controlPanel.appendChild(saveButton);
    controlPanel.appendChild(resetButton);
    
    // 添加控制面板到页面
    document.body.appendChild(controlPanel);
    
    // 添加编辑模式开关事件
    toggleButton.addEventListener('click', function() {
        // 修正：选择所有已标记为可编辑的元素
        const editableElements = document.querySelectorAll('.editable-element');
        
        if (this.innerText === '开启编辑') {
            // 开启编辑模式
            editableElements.forEach(el => el.setAttribute('contenteditable', 'true'));
            this.innerText = '关闭编辑';
            this.style.backgroundColor = '#FF9800';
            saveButton.style.display = 'block';
            resetButton.style.display = 'block';
        } else {
            // 关闭编辑模式
            editableElements.forEach(el => el.setAttribute('contenteditable', 'false'));
            this.innerText = '开启编辑';
            this.style.backgroundColor = '#4CAF50';
            saveButton.style.display = 'none';
            resetButton.style.display = 'none';
        }
    });
    
    // 添加保存按钮事件
    saveButton.addEventListener('click', function() {
        alert('文本修改已保存！（仅在本次会话中有效）');
    });
    
    // 添加重置按钮事件
    resetButton.addEventListener('click', function() {
        if (confirm('确定要重置所有修改过的文本吗？')) {
            const editableElements = document.querySelectorAll('.editable-element');
            editableElements.forEach(el => {
                const originalText = el.getAttribute('data-original-text');
                if (originalText) {
                    el.innerText = originalText;
                }
            });
            alert('所有文本已重置！');
        }
    });
}

// 页面加载完成后初始化编辑功能
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        makeAllTextEditable();
    }, 500);  // 延迟执行，确保页面完全加载
});

// 为动态加载的内容提供编辑功能
const observeDOM = (function() {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    
    return function(obj, callback) {
        if (!obj || obj.nodeType !== 1) return;
        
        if (MutationObserver) {
            const mutationObserver = new MutationObserver(callback);
            mutationObserver.observe(obj, { childList: true, subtree: true });
            return mutationObserver;
        } else if (window.addEventListener) {
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    };
})();

// 监听DOM变化，对新增元素应用编辑功能
observeDOM(document.body, function() {
    // 延迟执行以确保DOM已完全更新
    setTimeout(function() {
        makeAllTextEditable();
    }, 100);
});

// 确保按钮样式不受页面CSS影响
document.addEventListener('DOMContentLoaded', function() {
    // 添加一个内联样式元素
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        #editControlPanel button {
            font-family: Arial, sans-serif !important;
            font-size: 14px !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
            margin: 0 2px !important;
            transition: all 0.3s ease !important;
        }
        
        #editControlPanel button:hover {
            opacity: 0.9 !important;
            transform: translateY(-2px) !important;
        }
    `;
    document.head.appendChild(styleElement);
});

// 导出函数供外部使用
window.makeAllTextEditable = makeAllTextEditable; 