document.addEventListener('DOMContentLoaded', function() {
    // 获取所有弹窗元素
    const openingModal = document.getElementById('openingModal');
    const resultModal = document.getElementById('resultModal');
    const reconcileModal = document.getElementById('reconcileModal');
    const movieInviteModal = document.getElementById('movieInviteModal');
    const movieSelectModal = document.getElementById('movieSelectModal');
    const endingModal = document.getElementById('endingModal');
    
    // 获取按钮元素
    const helpWashBtn = document.getElementById('helpWash');
    const selfWashBtn = document.getElementById('selfWash');
    const resultOkBtn = document.getElementById('resultOk');
    const agreeBtn = document.getElementById('agree');
    const disagreeBtn = document.getElementById('disagree');
    const okayBtn = document.getElementById('okayBtn');
    const movieButtons = document.querySelectorAll('.movie-button');
    
    // 获取消息元素
    const resultMessage = document.getElementById('resultMessage');
    const movieResultMessage = document.getElementById('movieResultMessage');
    
    // 开篇弹窗 - 帮你洗按钮点击事件
    helpWashBtn.addEventListener('click', function() {
        // 显示太棒了的结果弹窗
        resultMessage.textContent = '太棒了！';
        resultModal.classList.add('show');
        
        // 标记为正确结果
        resultMessage.className = 'result-message correct show';
    });
    
    // 开篇弹窗 - 自己洗按钮点击事件
    selfWashBtn.addEventListener('click', function() {
        // 显示选的不对的结果弹窗
        resultMessage.textContent = '选的不对，重新选择！';
        resultModal.classList.add('show');
        
        // 标记为错误结果
        resultMessage.className = 'result-message incorrect show';
    });
    
    // 结果弹窗 - 确定按钮点击事件
    resultOkBtn.addEventListener('click', function() {
        // 隐藏结果弹窗
        resultModal.classList.remove('show');
        
        // 如果是太棒了的结果，显示和好弹窗
        if (resultMessage.textContent === '太棒了！') {
            openingModal.classList.remove('show');
            setTimeout(() => {
                reconcileModal.classList.add('show');
            }, 300);
        }
        // 否则保持开篇弹窗显示，用户可以重新选择
    });
    
    // 和好弹窗 - 同意按钮点击事件
    agreeBtn.addEventListener('click', function() {
        // 隐藏和好弹窗
        reconcileModal.classList.remove('show');
        // 显示电影邀请弹窗
        setTimeout(() => {
            movieInviteModal.classList.add('show');
        }, 300);
    });
    
    // 和好弹窗 - 不同意按钮点击事件
    disagreeBtn.addEventListener('click', function() {
        // 随机移动不同意按钮的位置
        const modalContent = disagreeBtn.closest('.modal-content');
        const modalRect = modalContent.getBoundingClientRect();
        const buttonRect = disagreeBtn.getBoundingClientRect();
        
        // 计算随机位置，确保按钮在弹窗内
        const maxX = modalRect.width - buttonRect.width;
        const maxY = modalRect.height - buttonRect.height;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        // 设置按钮位置
        disagreeBtn.style.position = 'relative';
        disagreeBtn.style.left = randomX + 'px';
        disagreeBtn.style.top = randomY + 'px';
        
        // 同意按钮放大
        agreeBtn.style.transform = 'scale(1.2)';
        agreeBtn.style.transition = 'transform 0.3s ease';
    });
    
    // 电影邀请弹窗 - 好的按钮点击事件
    okayBtn.addEventListener('click', function() {
        // 隐藏电影邀请弹窗
        movieInviteModal.classList.remove('show');
        // 显示电影选择弹窗
        setTimeout(() => {
            movieSelectModal.classList.add('show');
        }, 300);
    });
    
    // 电影选择按钮点击事件
    movieButtons.forEach(button => {
        button.addEventListener('click', function() {
            const selectedMovie = this.dataset.movie;
            
            // 清除之前的结果
            movieResultMessage.classList.remove('show', 'correct', 'incorrect');
            
            // 延迟显示结果，增加交互感
            setTimeout(() => {
                if (selectedMovie === '镖人') {
                    // 正确答案
                    movieResultMessage.textContent = '答对了，真棒！';
                    movieResultMessage.classList.add('show', 'correct');
                    
                    // 延迟显示结尾弹窗
                    setTimeout(() => {
                        movieSelectModal.classList.remove('show');
                        endingModal.classList.add('show');
                        // 调用自动关闭函数
                        closeEndingModal();
                    }, 1000);
                } else {
                    // 错误答案
                    movieResultMessage.textContent = '再猜一猜，你可以的！';
                    movieResultMessage.classList.add('show', 'incorrect');
                }
            }, 300);
        });
    });
    
    // 结尾弹窗自动关闭
    function closeEndingModal() {
        // 3秒后自动关闭结尾弹窗
        setTimeout(() => {
            endingModal.classList.remove('show');
        }, 3000);
    }
    
    // 防止页面滚动
    document.body.style.overflow = 'hidden';
    
    // 禁用右键菜单
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // 禁用键盘事件
    document.addEventListener('keydown', function(e) {
        // 禁用ESC键
        if (e.key === 'Escape') {
            e.preventDefault();
        }
    });
});