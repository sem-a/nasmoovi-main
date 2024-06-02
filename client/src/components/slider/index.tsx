import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Comments } from "@prisma/client";
import CommentSvg from "../../img/comments.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import styles from "./index.module.css";

type Props = {
  comments: Comments[];
};

const CustomSlider: React.FC<Props> = ({ comments }) => {
  return (
    <Swiper
      // Установите необходимые модули Swiper
      modules={[Pagination, Navigation, Autoplay]}
      // Настройки Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      loop={true}
      autoplay={{
        delay: 10000, // Задержка перед автопереключением (в миллисекундах)
        disableOnInteraction: false, // Продолжать автопроигрывание после взаимодействия пользователя
      }}
      speed={1000} // Время анимации перехода между слайдами (в миллисекундах)
      effect={"fade"} // Тип анимации перехода
      fadeEffect={{ crossFade: true }} // Дополнительные параметры для эффекта fade
      // Другие настройки Swiper
    >
      {comments.map((comment, index) => (
        <SwiperSlide key={index}>
          <div className={styles.slideContent}>
            <div className={styles.slideComment}>
              <p>
                {comment.comment}
                <span className={styles.slideAbsoluteSvg}>
                  <img src={CommentSvg} alt="запятые" />
                </span>
              </p>
              <div className={styles.author}>
                <div className={styles.line}></div>
                {comment.name}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSlider;
