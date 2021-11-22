const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")

console.log(prevBtn,nextBtn)

//Slide images on click
prevBtn.onclick = () => nextSlide(-1)
nextBtn.onclick = () => nextSlide(1)



/* // na svakih 2 sek... menja se slika
setInterval(() => {
    nextSlide(1)
}, 3500);
 */
let slideIndex = 1;

showSlides(slideIndex)


function nextSlide(n) {
    showSlides(slideIndex += n)
}

function currentSlide(n) {
    showSlides(slideIndex = n)
}

function showSlides(n) {
    let i
    const slides = document.querySelectorAll(".slide")
    const dots = document.querySelectorAll(".dot")

    if(n > slides.length) {
        slideIndex = 1
    }

    if(n < 1) {
        slideIndex = slides.length
    }

    for(i = 0; i < slides.length; i++) {
        slides[i].style.display= "none"
    }

    for(i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active","")
    }

    slides.forEach((slide)=> slide.classList.add("fade"))
    slides[slideIndex - 1].style.display ="block"
    dots[slideIndex - 1].className += " active"

}