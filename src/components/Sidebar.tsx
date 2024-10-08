import { useState } from "react";
import { motion } from "framer-motion";
import Links from "./Links";
import ToggleButton from "./ToggleButton";

const variants = {
  open: {
    clipPath: "circle(1200px at 50px 50px)",
    transition: {
      type: "spring",
      stiffness: 20,
    },
  },
  closed: {
    clipPath: "circle(30px at 50px 50px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center justify-center text-black"
      animate={open ? "open" : "closed"}
    >
      <motion.div
        className="fixed bottom-0 left-0 top-0 z-20 w-[400px] bg-white max-sm:w-[250px]"
        variants={variants}
      >
        <Links setOpen={setOpen} />
      </motion.div>

      <ToggleButton setOpen={setOpen} />
    </motion.div>
  );
};

export default Sidebar;
