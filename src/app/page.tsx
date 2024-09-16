import { erika, bitscript, passenger, duplet } from "../helpers/fonts";
import Image from "next/image";

export default function HomePage() {
  return (
    // pick right / left dark mode / light mode v1
    <body className="flex h-screen w-screen overflow-x-hidden overflow-y-hidden">
      <div className="relative h-screen w-1/2 bg-[#111]">
        <h1
          className={`${erika.className} absolute bottom-4 right-8 z-[1] w-1/2 select-none text-[9px] leading-[34px] text-[#eee]`}
        >
          I looked you in the eye. “The meaning of life, the reason I made this
          whole universe, is for you to mature.” “You mean mankind? You want us
          to mature?” “No, just you. I made this whole universe for you. With
          each new life you grow and mature and become a larger and greater
          intellect.” “Just me? What about everyone else?” “There is no one
          else,” I said. “In this universe, there’s just you and me.” You stared
          blankly at me. “But all the people on earth…” “All you. Different
          incarnations of you.” “Wait. I’m everyone!?” “Now you’re getting it,”
          I said, with a congratulatory slap on the back. “I’m every human being
          who ever lived?” “Or who will ever live, yes.” “I’m Abraham Lincoln?”
          “And you’re John Wilkes Booth, too,” I added. “I’m Hitler?” You said,
          appalled. “And you’re the millions he killed.” “I’m Jesus?” “And
          you’re everyone who followed him.” You fell silent. “Every time you
          victimized someone,” I said, “you were victimizing yourself. Every act
          of kindness you’ve done, you’ve done to yourself. Every happy and sad
          moment ever experienced by any human was, or will be, experienced by
          you.” You thought for a long time. “Why?” You asked me. “Why do all
          this?” “Because someday, you will become like me. Because that’s what
          you are. You’re one of my kind. You’re my child.” “Whoa,” you said,
          incredulous. “You mean I’m a god?” “No. Not yet. You’re a fetus.
          You’re still growing. Once you’ve lived every human life throughout
          all time, you will have grown enough to be born.” “So the whole
          universe,” you said, “it’s just…” “An egg.” I answered. “Now it’s time
          for you to move on to your next life.” And I sent you on your way.
        </h1>
        <div className="absolute left-0 top-0 z-[100] select-none">
          <Image src="/image.png" width={564} height={778} alt="" />
        </div>

        <div className="absolute bottom-[50%] right-[2.5%] flex items-center justify-center">
          <h1 className={`${passenger.className} mr-8 text-[24px] text-[#eee]`}>
            nox.{" "}
            <span className={`${duplet.className} text-[12px] text-[#eee]`}>
              (dark)
            </span>
          </h1>
          <svg
            width="23"
            height="60"
            viewBox="0 0 23 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.1649 24.3774C22.1649 29.2545 22.0887 35.1984 21.3266 41.2186C20.7932 45.4861 19.7263 49.6011 17.5164 53.4113C16.6781 54.783 15.6875 56.0785 14.4682 57.1454C11.2676 59.8887 7.22875 59.8125 4.10436 56.9168C2.73267 55.6975 1.89442 54.1734 1.28478 52.4969C0.522738 50.2869 0.217919 47.9246 0.141715 45.5623C-0.239308 36.7987 0.141715 28.0352 1.36099 19.3479C1.81822 16.2235 2.42785 13.0991 3.49472 10.0509C4.25677 7.84096 5.24743 5.78343 6.61911 3.95452C7.99079 2.12561 9.7435 0.753922 12.0296 0.144285C13.0965 -0.0843288 14.0872 -0.0081241 15.154 0.144285C18.0498 0.677718 19.7263 2.35422 20.6408 5.09759C21.479 7.38373 21.86 9.74607 21.9362 12.1084C22.0124 15.8424 22.0887 19.5765 22.1649 24.3774ZM17.4402 19.8813C17.5164 19.5765 17.5164 19.3479 17.5164 19.1192C17.5164 16.7569 17.5926 14.3946 17.5164 12.1084C17.4402 10.5843 17.2116 9.06023 16.9829 7.61234C16.8305 6.77409 16.3733 5.93584 16.0685 5.09759C15.4588 3.57349 13.2489 3.11627 11.9534 4.18313C11.039 4.94518 10.2769 5.78343 9.8197 6.85029C9.13386 8.29818 8.52423 9.82228 8.067 11.3464C6.92393 15.69 6.3905 20.1099 6.00947 24.5298C5.62845 29.1783 5.39984 33.9029 5.24743 38.6276C5.09502 41.9806 5.17122 45.4098 5.62845 48.7629C5.78086 49.9821 6.08568 51.2014 6.61911 52.3445C8.1432 55.2402 10.658 55.5451 12.7155 53.0303C13.6299 51.9634 14.1634 50.7442 14.6206 49.4487C15.4588 47.1626 15.9161 44.8002 16.2209 42.4379C16.3733 41.4472 16.4495 40.4565 16.5257 39.4659C15.4588 38.9325 14.392 38.5514 13.4775 38.018C10.3531 36.2653 8.90525 33.5981 9.21007 29.9403C9.36248 27.7304 9.97211 25.6728 11.1152 23.6915C12.5631 21.4054 14.392 19.8051 17.4402 19.8813Z"
              fill="#EEEEEE"
            />
          </svg>
        </div>
      </div>
      <div className="relative h-screen w-1/2 bg-[#eee]">
        <h1
          className={`${erika.className} absolute right-4 top-4 z-[100] m-8 w-[45%] select-none text-right text-[9px] leading-[34px] text-[#111]`}
        >
          Shush… Sometimes the player read lines of code on a screen. Decoded
          them into words; decoded words into meaning; decoded meaning into
          feelings, emotions, theories, ideas, and the player started to breath
          faster and deeper and realised it was alive, it was alive, those
          thousand deaths had not been real, the player was alive <br />
          You. You. You are alive. <br />
          and sometimes the player believed the universe had spoken to it
          through the sunlight that came through the shuffling leaves of the
          summer trees
          <br />
          and sometimes the player believed the universe had spoken to it
          through the light that fell from the crisp night sky of winter, where
          a fleck of light in the corner of the player’s eye might be a star a
          million times as massive as the sun, boiling its planets to plasma in
          order to be visible for a moment to the player, walking home at the
          far side of the universe, suddenly smelling food, almost at the
          familiar door, about to dream again
          <br />
          and sometimes the player believed the universe had spoken to it
          through the zeros and ones, through the electricity of the world,
          through the scrolling words on a screen at the end of a dream
          <br />
          and the universe said I love you <br /> and the universe said you have
          played the game well <br />
          and the universe said everything you need is within you <br />
          and the universe said you are stronger than you know <br />
          and the universe said you are the daylight <br /> and the universe
          said you are the night <br /> and the universe said the darkness you
          fight is within you <br />
          and the universe said the light you seek is within you <br /> and the
          universe said you are not alone
          <br />
          and the universe said you are not separate from every other thing{" "}
          <br />
          and the universe said you are the universe tasting itself, talking to
          itself, reading its own code <br /> and the universe said I love you
          because you are love. <br />
          And the game was over and the player woke up from the dream. And the
          player began a new dream. And the player dreamed again, dreamed
          better. And the player was the universe. And the player was love.
          <br />
          You are the player.
          <br />
          Wake up.
        </h1>
        <div className="absolute bottom-[50%] left-[2.5%] flex items-center justify-center">
          <div>
            <svg
              width="23"
              height="60"
              viewBox="0 0 23 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-6.24816e-05 24.3774C-6.24816e-05 29.2545 0.0761425 35.1984 0.838189 41.2186C1.37162 45.4861 2.43849 49.6011 4.64842 53.4113C5.48667 54.783 6.47733 56.0785 7.69661 57.1454C10.8972 59.8887 14.936 59.8125 18.0604 56.9168C19.4321 55.6975 20.2704 54.1734 20.88 52.4969C21.6421 50.2869 21.9469 47.9246 22.0231 45.5623C22.4041 36.7987 22.0231 28.0352 20.8038 19.3479C20.3466 16.2235 19.7369 13.0991 18.6701 10.0509C17.908 7.84096 16.9174 5.78343 15.5457 3.95452C14.174 2.12561 12.4213 0.753922 10.1352 0.144285C9.06829 -0.0843288 8.07763 -0.0081241 7.01077 0.144285C4.11499 0.677718 2.43849 2.35422 1.52403 5.09759C0.685779 7.38373 0.304757 9.74607 0.228552 12.1084C0.152348 15.8424 0.0761422 19.5765 -6.24816e-05 24.3774ZM4.72463 19.8813C4.64842 19.5765 4.64842 19.3479 4.64842 19.1192C4.64842 16.7569 4.57222 14.3946 4.64842 12.1084C4.72463 10.5843 4.95324 9.06023 5.18185 7.61234C5.33426 6.77409 5.79149 5.93584 6.09631 5.09759C6.70595 3.57349 8.91588 3.11627 10.2114 4.18313C11.1258 4.94518 11.8879 5.78343 12.3451 6.85029C13.0309 8.29818 13.6406 9.82228 14.0978 11.3464C15.2409 15.69 15.7743 20.1099 16.1553 24.5298C16.5363 29.1783 16.765 33.9029 16.9174 38.6276C17.0698 41.9806 16.9936 45.4098 16.5363 48.7629C16.3839 49.9821 16.0791 51.2014 15.5457 52.3445C14.0216 55.2402 11.5068 55.5451 9.44931 53.0303C8.53486 51.9634 8.00143 50.7442 7.5442 49.4487C6.70595 47.1626 6.24872 44.8002 5.9439 42.4379C5.79149 41.4472 5.71529 40.4565 5.63908 39.4659C6.70595 38.9325 7.77281 38.5514 8.68727 38.018C11.8117 36.2653 13.2595 33.5981 12.9547 29.9403C12.8023 27.7304 12.1927 25.6728 11.0496 23.6915C9.60172 21.4054 7.77281 19.8051 4.72463 19.8813Z"
                fill="#111111"
              />
            </svg>
          </div>

          <h1 className={`${passenger.className} ml-8 text-[24px] text-[#111]`}>
            lumos.
            <span
              className={`${duplet.className} ml-2 text-[12px] font-semibold text-[#111]`}
            >
              (light)
            </span>
          </h1>
        </div>
        <div className="absolute bottom-0 right-0">
          <Image src="/slice-1.png" width={424} height={563} alt="" />
        </div>
      </div>
    </body>
  );
}
