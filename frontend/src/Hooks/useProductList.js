import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMemberInfo } from "../Tools/MemberFunctions";
import { toast } from "react-toastify";
import { handleLogout } from "../Redux/Actions";
import { getAllCampgroundsInfo } from "../Tools/ProductFunctions";

export default function useProductList() {
  const [myProducts, setMyProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [myInfo, setMyInfo] = useState(null);

  const userState = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);

      const myInfoResult = await getMemberInfo(userState.userInfo);

      if (myInfoResult === null) {
        toast("토큰이 만료되었습니다.");
        dispatch(handleLogout());
        navigate("/login");
        return;
      }
      setMyInfo(myInfoResult);

      const allProducts = await getAllCampgroundsInfo(1, 10000);

      if (allProducts) {
        const mine = allProducts.filter((product) => {
          return (
            product.deleted === false &&
            product.memberId === userState.userInfo.memberId
          );
        });
        setMyProducts((prev) => mine);
      }

      setIsLoading((prev) => false);
    })();
  }, []);

  return { isLoading, myProducts, myInfo };
}
