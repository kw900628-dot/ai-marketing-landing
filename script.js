// ============================================
// 스무스 스크롤 기능
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // 모든 앵커 링크에 대해 스무스 스크롤 적용
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 빈 해시나 페이지 맨 위로 가는 경우만 처리
            if (href === '#' || href === '#top') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // 헤더 높이 고려한 오프셋
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                closeMobileMenu();
            }
        });
    });
});

// ============================================
// 모바일 메뉴 토글
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
    
    // 아이콘 변경 (햄버거 ↔ X)
    const icon = mobileMenuBtn.querySelector('svg');
    if (mobileMenu.classList.contains('active')) {
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        `;
        mobileMenuBtn.setAttribute('aria-label', '모바일 메뉴 닫기');
    } else {
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        `;
        mobileMenuBtn.setAttribute('aria-label', '모바일 메뉴 열기');
    }
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenu.classList.add('hidden');
        
        const icon = mobileMenuBtn.querySelector('svg');
        icon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        `;
        mobileMenuBtn.setAttribute('aria-label', '모바일 메뉴 열기');
    }
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// 모바일 메뉴 링크 클릭 시 메뉴 닫기
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ============================================
// 헤더 스크롤 효과
// ============================================
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// 스크롤 리빌 애니메이션
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// 스크롤 리빌 대상 요소들
const scrollRevealElements = document.querySelectorAll('.feature-card, .portfolio-card, #about, #contact');
scrollRevealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ============================================
// 문의 폼 제출 처리
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value
        };
        
        // 여기서는 콘솔에 출력만 하고, 실제로는 서버로 전송해야 함
        console.log('문의 내용:', formData);
        
        // 성공 메시지 표시 (실제 구현에서는 서버 응답 후 처리)
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        
        // 폼 리셋
        contactForm.reset();
        
        // 실제 구현 예시:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(formData)
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('문의가 접수되었습니다.');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        //     alert('오류가 발생했습니다. 다시 시도해주세요.');
        // });
    });
}

// ============================================
// 페이지 로드 애니메이션
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('fade-in');
    
    // 히어로 섹션 요소들에 애니메이션 적용
    const heroElements = document.querySelectorAll('#hero h1, #hero p, #hero .btn-primary, #hero .btn-secondary');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// ============================================
// 윈도우 리사이즈 처리
// ============================================
window.addEventListener('resize', function() {
    // 데스크톱 사이즈로 변경되면 모바일 메뉴 닫기
    if (window.innerWidth >= 768 && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ============================================
// 키보드 접근성 향상
// ============================================
document.addEventListener('keydown', function(e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
        mobileMenuBtn.focus();
    }
});