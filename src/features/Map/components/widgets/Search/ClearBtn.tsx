import {memo} from 'react';
import {XIcon} from "lucide-react";

const ClearBtn = memo(({handleClear}: { handleClear: () => void }) => {
    return <XIcon onClick={handleClear} className="text-gray-500 cursor-pointer"/>
})

export default ClearBtn;