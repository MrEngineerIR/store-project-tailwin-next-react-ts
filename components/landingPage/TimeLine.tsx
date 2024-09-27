const TimeLine = () => {
  return (
    <div className="font-sans mx-auto mt-20 w-[80%] relative items-center font-tanha">
      <h1 className="text-6xl font-bold text-center mb-10">خط زمانی</h1>
      <div className=" absolute w-4 rounded-full  left-0 ml-1  h-[80%] md:left-[50%] top-28 bg-white/30 md:h-[80%]">
        <div className=" sticky w-4 h-4 rounded-full bg-red-500 top-1/2">
          <div className=" absolute w-4 h-4 rounded-full bg-red-500 animate-ping"></div>
        </div>
      </div>

      <div className="  text-sm md:text-4xl block md:grid grid-rows-4 grid-cols-2 w-full md:bg-white/5  text-center p-5 gap-x-20 md:p-10 h-80  md:h-[500px]">
        <div className="h-20 bg-white/10 rounded content-center sm:text-lg">
          در لحظه || سفارش شما
        </div>
        <div className=" min-h-20 bg-white/10 row-start-2 content-center rounded col-start-2 max-h-fit sm:text-lg">
          1روز || تایید توسط واحد فروش
        </div>
        <div className="min-h-20 bg-white/10 row-start-3 content-center rounded col-start-1 max-h-fit sm:text-lg">
          40 روز || فرایند ساخت
        </div>
        <div className="min-h-20 bg-white/10 row-start-4  content-center rounded col-start-2 max-h-fit sm:text-lg">
          2 روز || تحویل
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
