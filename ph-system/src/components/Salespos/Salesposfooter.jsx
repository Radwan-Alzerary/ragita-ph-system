import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { green } from "@mui/material/colors";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { IconButton } from "@mui/material";

function Salesposfooter(props) {
  return (
    <div className=" absolute bottom-0 h-16  w-full bg-zinc-50 ">
      <div className="flex items-center h-full ">
        <div className=" flex items-center gap-2 w-[67%]">
          {props.requestQueue.map((requestQueue, index) => (
            <div
              className={`relative   ${
                props.currentRequestQueue === requestQueue._id
                  ? "bg-green-200 rounded-full"
                  : ""
              }`}
              onClick={() => props.handleRequestQueue(requestQueue._id)}
            >
              <IconButton
                variant="filledTonal"
                aria-label="fingerprint"
                color="success"
              >
                <PersonOutlineOutlinedIcon
                  style={{ fontSize: "50px" }}
                  sx={{ color: "black" }}
                ></PersonOutlineOutlinedIcon>
              </IconButton>
              <p className=" absolute font-bold text-green-700 top-2 left-3">
                {requestQueue.number}
              </p>
            </div>
          ))}

          <div onClick={props.onNewQueue}>
            <IconButton aria-label="fingerprint" color="success">
              <PersonAddOutlinedIcon
                style={{ fontSize: "50px" }}
                sx={{ color: green[500] }}
              ></PersonAddOutlinedIcon>
            </IconButton>
          </div>
        </div>

        <div className="w-[33%] ">
          <button
            type="button"
            onClick={props.finishHandleData}
            class="text-black w-[31%] bg-green-400 hover:bg-green-500  font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
          >
            انتهاء
          </button>
          <button
            type="button"
            class="text-black w-[31%] bg-red-400 hover:bg-red-500 font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
          >
            الغاء
          </button>
          {props.isEdit ? (
            <button
              type="button"
              class="text-black w-[31%] bg-gray-400 hover:bg-gray-500  font-normal rounded-lg text-lg px-5 py-2.5 mr-2  "
            >
              ارجاع
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Salesposfooter;
