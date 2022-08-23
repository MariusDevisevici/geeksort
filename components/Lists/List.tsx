import { useEffect, useState } from "react";

function List({ data }: { data: any }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [daysInMonth, setDaysInMonth] = useState(
    new Date(year, month, 0).getDate()
  );
  useEffect(() => {
    setDaysInMonth(new Date(year, month, 0).getDate());
  }, [year, month]);

  return (
    <div className="w-full ">
      <div className="flex flex-col  ">
        <div className="flex">
          <button
            onClick={() => {
              setYear(year + 1);
            }}
          >
            +
          </button>
          select year
          <button
            onClick={() => {
              setYear(year - 1);
            }}
          >
            -
          </button>
          {year}
        </div>
        <select
          onChange={(e) => {
            setMonth(Number(e.target.value));
          }}
          defaultValue="DEFAULT"
        >
          <option value="DEFAULT" hidden disabled>
            Choose Date
          </option>
          <option value="0">Jan</option>
          <option value="1">Feb</option>
          <option value="2">Mar</option>
          <option value="3">Apr</option>
          <option value="4">May</option>
          <option value="5">Jun</option>
          <option value="6">Jul</option>
          <option value="7">Aug</option>
          <option value="8">Sep</option>
          <option value="9">Oct</option>
          <option value="10">Nov</option>
          <option value="11">Dec</option>
        </select>
      </div>
      <div className=" overflow-scroll whitespace-nowrap w-full ">
        {Array(daysInMonth)
          .fill("")
          .map((el, i) => {
            return (
              <div key={i} className="inline-block w-80 ">
                {i + 1}
              </div>
            );
          })}

        {data
          .filter(
            (el: any) =>
              el.createdAt.getFullYear() === year &&
              el.createdAt.getMonth() === month
          )
          .map((el: any) => {
            return (
              <div
                className="w-80 text-center bg-red-100 rounded-full m-4 h-16 flex justify-center items-center"
                key={el.id}
                style={{
                  marginLeft:
                    el.updatedAt.getMonth() === month
                      ? `${
                          el.createdAt.getDate() *
                          304 *
                          (el.updatedAt.getDate() / el.createdAt.getDate())
                        }px`
                      : `${daysInMonth * 304}px`,
                }}
              >
                <p> {el.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default List;
