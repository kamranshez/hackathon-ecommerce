import { AiOutlinePlus, AiOutlineMinus, AiOutlineDelete } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slice/cartSlice";

interface Props {
  id: string;
  qty: number;
}

const CartItemQtyCard: React.FC<Props> = ({ id, qty }) => {
  const dispatch = useDispatch();

  const [itemQty, setitemQty] = useState<number>(qty);
  const is_disbale = qty <= 1 ? true : false;

  const [disableQtyBtn, setDisableQtyBtn] = useState<boolean>(is_disbale);

  const handleUpdateCartItemQuantity = (id: string, action: string) => {
    setDisableQtyBtn(false);
    if (action === "dec") {
      if (itemQty - 1 == 1) setDisableQtyBtn(true);

      setitemQty((prev: number) => --prev);
    } else {
      setitemQty((prev: number) => ++prev);
    }
    // dispatch(cartActions.updateCartItemQuantity({id: id, quantity:itemQty}))
  };

  useEffect(() => {
    dispatch(cartActions.updateCartItemQuantity({ id, quantity: itemQty }));
  }, [id, itemQty]);

  return (
    <>
      <Button
        disabled={disableQtyBtn}
        onClick={() => handleUpdateCartItemQuantity(id, "dec")}
        variant={"outline"}
        className="w-fill"
      >
        <AiOutlineMinus />
      </Button>
      <input
        className="mx-2 border text-center w-8"
        readOnly={true}
        value={itemQty}
      />
      <Button
        onClick={() => handleUpdateCartItemQuantity(id, "inc")}
        variant={"outline"}
        className="w-fill"
      >
        <AiOutlinePlus />
      </Button>
    </>
  );
};
export default CartItemQtyCard;
