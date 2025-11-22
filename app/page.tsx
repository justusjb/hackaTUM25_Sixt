import Image from "next/image";
import ApplePayButton from './components/ApplePayButton';


export default function Home() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-black">Apple Pay Test</h1>
                <ApplePayButton />
            </div>
        </main>
    );
}
