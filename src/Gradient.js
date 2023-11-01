export default function Gradient() {
    return (
        <div
            className="width-full overflow-hidden h-4 rounded-lg
		 justify-items-stretch"
        >
            <img
                src={process.env.PUBLIC_URL + "/gradientfile.png"}
                alt="gradient"
                className="w-full"
            />
        </div>
    );
}
