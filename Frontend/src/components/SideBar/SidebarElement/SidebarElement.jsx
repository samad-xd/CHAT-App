import { useNavigate } from 'react-router-dom';
import './SidebarElement.css';

import { motion } from 'framer-motion';

export default function SidebarElement({ open, isActive, setActiveElement, icon, name, path }) {

    const navigate = useNavigate();

    const variants = {
        true: {
            padding: "6px"
        },
        false: {
            padding: "0px"
        }
    }

    const spanVariants = {
        true: {
            opacity: "100%",
            transition: {
                delay: 0.15,
            }
        },
        false: {
            opacity: "0%"
        }
    }

    function handleClick() {
        setActiveElement(path);
        navigate(path);
    }

    return (
        <motion.div
            className={isActive ? "sidebar-element-active" : "sidebar-element"}
            initial={`${open}`}
            animate={`${open}`}
            variants={variants}
            whileHover={{ scale: 1.05 }}
            onClick={handleClick}
        >
            <motion.div className="sidebar-icon">
                {icon}
            </motion.div>
            <motion.span
                initial={`${open}`}
                animate={`${open}`}
                variants={spanVariants}
            >
                {name}
            </motion.span>
        </motion.div>
    );
}