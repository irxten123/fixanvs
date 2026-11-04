
document.addEventListener("DOMContentLoaded", function () {

    // ELEMENT HTML
    const music = document.getElementById("backgroundMusic");
    const musicToggle = document.getElementById("musicToggle");
    const musicIcon = document.getElementById("musicIcon");
    const musicLabel = document.getElementById("musicLabel");

    const stars = document.getElementById("stars");

    const memoryImages = document.querySelectorAll(".memory-image");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    const giftBox = document.getElementById("giftBox");
    const giftLetter = document.getElementById("giftLetter");
    const giftHint = document.getElementById("giftHint");
    const typedLetter = document.getElementById("typedLetter");
    const typingCursor = document.getElementById("typingCursor");


    // DATA SURAT
    let letterContent =
        "Thank you for being part of my life. Thank you for every little thing, every laugh, every story, and every moment we've shared. I hope we can keep creating beautiful memories together. No matter what happens, I hope you always remember how special you are to me. Happy anniversary, my favorite person. I love you!";

    let typingInterval;
    let isGiftOpen = false;


    // MEMBUAT BINTANG
    if (stars) {
        for (let i = 0; i < 70; i++) {
            const star = document.createElement("span");

            star.classList.add("star");
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";
            star.style.animationDelay = Math.random() * 3 + "s";
            star.style.animationDuration = 2 + Math.random() * 4 + "s";

            stars.appendChild(star);
        }
    }


    // MUSIK
    if (music && musicToggle) {

        musicToggle.addEventListener("click", function () {

            if (music.paused) {

                music.play()
                    .then(function () {

                        musicToggle.classList.add("playing");
                        musicIcon.textContent = "♫";
                        musicLabel.textContent = "Pause music";

                        musicToggle.setAttribute(
                            "aria-label",
                            "Jeda musik"
                        );

                    })
                    .catch(function () {

                        alert(
                            "Musik tidak dapat diputar. Pastikan file musik.mp3 tersedia."
                        );

                    });

            } else {

                music.pause();

                musicToggle.classList.remove("playing");
                musicIcon.textContent = "♪";
                musicLabel.textContent = "Play music";

                musicToggle.setAttribute(
                    "aria-label",
                    "Putar musik"
                );

            }

        });


        music.addEventListener("ended", function () {

            musicToggle.classList.remove("playing");
            musicIcon.textContent = "♪";
            musicLabel.textContent = "Play music";

        });

    }


    // LIGHTBOX FOTO MEMORIES
    memoryImages.forEach(function (button) {

        button.addEventListener("click", function () {

            const image = button.querySelector("img");

            if (image && lightbox && lightboxImage) {

                lightboxImage.src = image.src;

                lightbox.classList.add("show");

                document.body.style.overflow = "hidden";

            }

        });

    });


    // MENUTUP FOTO
    function closePhotoPreview() {

        if (lightbox) {

            lightbox.classList.remove("show");

            document.body.style.overflow = "";

        }

    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closePhotoPreview
        );

    }


    if (lightbox) {

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {

                closePhotoPreview();

            }

        });

    }


    // MEMBUKA GIFT DAN MENAMPILKAN SURAT
    function startTyping() {

        clearInterval(typingInterval);

        if (!typedLetter || !typingCursor) {
            return;
        }

        typedLetter.textContent = "";

        typingCursor.style.display = "inline";

        let index = 0;

        typingInterval = setInterval(function () {

            if (index < letterContent.length) {

                typedLetter.textContent +=
                    letterContent.charAt(index);

                index++;

            } else {

                clearInterval(typingInterval);

                typingCursor.style.display = "none";

            }

        }, 35);

    }


    // TOMBOL GIFT
    if (giftBox && giftLetter) {

        giftBox.addEventListener("click", function () {

            isGiftOpen = !isGiftOpen;

            if (isGiftOpen) {

                giftLetter.classList.add("show");

                giftBox.setAttribute(
                    "aria-expanded",
                    "true"
                );

                if (giftHint) {
                    giftHint.textContent = "Your gift is open ♡";
                }

                startTyping();

                setTimeout(function () {

                    giftLetter.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }, 300);

            } else {

                giftLetter.classList.remove("show");

                giftBox.setAttribute(
                    "aria-expanded",
                    "false"
                );

                if (giftHint) {
                    giftHint.textContent = "Tap to open your gift";
                }

                clearInterval(typingInterval);

            }

        });

    }


    // MENUTUP POPUP DENGAN TOMBOL ESC
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closePhotoPreview();

        }

    });

});