import FallbackImage from "@/assets/images/AppFallbackImage.png"

const AppFallback = () => (
    <div className="h-[100vh] bg-primary flex items-center justify-center">
        <img src={FallbackImage} alt="App fallback image" width={250} height={250} className="animate-pulse"/>
    </div>
);

export default AppFallback;