// 复制到剪贴板功能
function copyToClipboard(button, text) {
  // 使用现代的 Clipboard API
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() {
      // 复制成功
      const originalText = button.textContent;
      button.textContent = '已复制!';
      button.classList.add('copied');
      
      // 2秒后恢复原状
      setTimeout(function() {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(function(err) {
      console.error('复制失败:', err);
      // 如果Clipboard API失败，尝试备用方案
      fallbackCopy(button, text);
    });
  } else {
    // 备用方案：使用旧的 execCommand 方法
    fallbackCopy(button, text);
  }
}

// 备用复制方法（兼容旧浏览器）
function fallbackCopy(button, text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    document.execCommand('copy');
    const originalText = button.textContent;
    button.textContent = '已复制!';
    button.classList.add('copied');
    
    setTimeout(function() {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
    button.textContent = '复制失败';
    setTimeout(function() {
      button.textContent = '复制';
    }, 2000);
  }
  
  document.body.removeChild(textArea);
}
