type ResizeHandlerProps = {
    isResizing: boolean;
    getResizeHandler: (event: unknown) => void;
};

const ResizeHandler = (props: ResizeHandlerProps) => {
    const {isResizing, getResizeHandler} = props;
    return  <div
        className={`absolute left-0 top-0 cursor-col-resize touch-none h-full w-1 bg-border hover:bg-primary/20 transition-colors duration-200 select-none ${
            isResizing ? "bg-secondary" : ""
        }`}
        onMouseDown={getResizeHandler} //for desktop
        onTouchStart={getResizeHandler} //for mobile
    />
};

export default ResizeHandler;