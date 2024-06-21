new Swiper('.wrapper__center', {
    spaceBetween: 5,
    centeredSlides: true,
    autoplay: {

        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    grabCursor: true,
    mousewheel: {
        sensitivity: 1,
        eventsTarget: ".wrapper__center"
    },

});

const
    productBtns = document.querySelectorAll('.wrapper__bottom-btn'),       /* pastdigi karzina */
    basketBtn = document.querySelector('.wrapper__top-btn'),               /* tepadagi karziba */
    basketIndecator = document.querySelector('.wrapper__top-indecator'),   /* tepa qismdagi indecator */
    basketModal = document.querySelector('.basket'),      /* korzina bosilganda chiqadigan modal oyna */
    closeBasketModal = document.querySelector('.basket__top-btnClose'),    /* modal oynani yopish */
    basketChecklist = document.querySelector('.basket__checklist'),        /* mahsulotlar yigiladgan qism */
    basketTotalPrice = document.querySelector('.basket__bottom-totalPrice'),   /* umumiy narx */
    basketPrint = document.querySelector('.basket-bottom'),               /* check chiqazadgan qism */
    printChecklist = document.querySelector('.print__body'),
    printTotalSumm = document.querySelector('.print__footer');

const product = {

    crazy: {
        name: 'Crazy',
        price: 31000,
        amount: 0,
        img: './img/burger-1.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        amount: 0,
        img: './img/burger-2.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'Cheeseburger',
        price: 29000,
        amount: 0,
        img: './img/burger-3.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        amount: 0,
        img: './img/burger-4.png',
        get totalSum() {
            return this.price * this.amount;
        }
    },

};


productBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
        plusOrMinus(this)
    })
});

function plusOrMinus(knopka) {
    let parent = knopka.closest('.wrapper__bottom-block');
    let parentId = parent.getAttribute('id');
    product[parentId].amount++;
    basket()
};

function basket() {

    let carts = [];
    for (const key in product) {
        let burger = product[key];
        let productBurger = document.querySelector(`#${key}`);
        let productCount = productBurger.querySelector('.wrapper__list-count');

        if (burger.amount > 0) {
            carts.push(burger);
            productCount.classList.add('active');
            productCount.innerHTML = burger.amount;
        } else {
            productCount.classList.remove('active');
            productCount.innerHTML = "";
        }
    }

    let allCount = totalCount();
    if (allCount > 0) {
        basketIndecator.classList.add('active');
        basketIndecator.innerHTML = allCount;
    } else {
        basketIndecator.classList.remove('active');
    }

    basketChecklist.innerHTML = "";

    carts.forEach((item) => {
        basketChecklist.innerHTML += createBurger(item)
    });


    basketTotalPrice.innerHTML = totalSummProduct();
}


function totalCount() {
    let total = 0;
    for (const key in product) total += product[key].amount;
    return total;
}


function createBurger(dataBurger) {
    const { name, totalSum: price, amount, img } = dataBurger;

    return `
    <div class="basket__checklist-product"}>

    <div class="basket__checklist-info">

        <img src="${img}" alt="">

        <div class="basket__checklist-sub">
            <p class="basket__checklist-name">${name}</p>
            <p class="basket__checklist-price"><span>${price.toLocaleString()}</span> сум</p>
        </div>

    </div>

    <div class="basket__checklist-counter" id="${name.toLowerCase()}__card">
        <button class="basket__checklist-symbol" data-symbol="-">-</button>
        <output class="basket__checklist-output">${amount}</output>
        <button class="basket__checklist-symbol" data-symbol="+">+</button>
    </div>

</div>

    `
}



window.addEventListener('click', function (event) {
    const btn = event.target;

    if (btn.classList.contains('basket__checklist-symbol')) {
        const attr = btn.getAttribute('data-symbol');

        let parentBurger = btn.closest('.basket__checklist-counter');


        if (parentBurger) {
            const idProduct = parentBurger.getAttribute('id').split('__')[0];

            if (attr == '+') {
                product[idProduct].amount++
            } else if (attr == '-') {
                product[idProduct].amount--
            }

            basket()
        }
    };

});


function totalSummProduct() {

    let total = 0;

    for (const key in product) {
        total += product[key].totalSum;
    };

    return total.toLocaleString() + ' сум';
}


basketBtn.addEventListener('click', function () {
    basketModal.classList.toggle('active');
});


closeBasketModal.addEventListener('click', () => {
    basketModal.classList.remove('active');
});

basketPrint.addEventListener('click', function () {
    printChecklist.innerHTML = ''

    for (const key in product) {
        const { name, totalSum, amount } = product[key]

        if (amount) {
            printChecklist.innerHTML +=

                `
            <div class="print__item">

            <p class="print__body-item_name">
                <span class="name">${name}</span>
                <span class="count">${amount}</span>
                <p class="print__body-item-sum">${totalSum}</p>

            </p>

        </div>
            `

        }
    }

    printTotalSumm.innerHTML = totalSummProduct()
    window.print()
});
