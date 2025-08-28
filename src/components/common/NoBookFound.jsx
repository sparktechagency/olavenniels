import { BookOpen, Search, RefreshCw, Headphones } from "lucide-react";

const NoBookFound = ({
    searchQuery = "",
    onClearSearch = () => { },
    showRetryButton = true,
    showClearButton = true,
    title = "No Books Found",
    title2 = "No Books Found"
}) => {
    const onRetry = () => {
        window.location.reload()
    }
    return (
        <div className="flex flex-col rounded-md items-center justify-center min-h-[500px] px-6 py-12 text-center" style={{ backgroundColor: '#2A2A2A' }}>
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 rounded-full opacity-5" style={{ backgroundColor: '#FABA00' }}></div>
                <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full opacity-5" style={{ backgroundColor: '#FABA00' }}></div>
                <div className="absolute top-1/2 right-8 w-12 h-12 rounded-full opacity-5" style={{ backgroundColor: '#2A2A2A' }}></div>
            </div>

            {/* Main Icon Container */}
            <div className="relative mb-8 z-10">
                <div
                    className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                    style={{ backgroundColor: '#faba00' }}
                >
                    <div className="relative">
                        <BookOpen className="w-16 h-16" style={{ color: '#2A2A2A' }} />
                        <div
                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-md"
                            style={{ backgroundColor: '#2A2A2A' }}
                        >
                            <Search className="w-4 h-4" style={{ color: '#fff' }} />
                        </div>
                    </div>
                </div>

                {/* Floating Audio Icon */}
                <div
                    className="absolute -bottom-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg animate-bounce"
                    style={{ backgroundColor: '#fff' }}
                >
                    <Headphones className="w-6 h-6" style={{ color: '#2A2A2A' }} />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-md z-10">
                <h1
                    className="text-3xl font-bold mb-4"
                    style={{ color: 'white' }}
                >
                    {title2}
                </h1>

                {searchQuery ? (
                    <div className="mb-8">
                        <p className="text-gray-600 mb-3">
                            We searched high and low but couldn't find any audio books for
                        </p>
                        <div
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold"
                            style={{ backgroundColor: '#2A2A2A', color: '#FABA00' }}
                        >
                            "{searchQuery}"
                        </div>
                    </div>
                ) : (
                    <p className="text-white mb-8">
                        {title}
                    </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 mb-10">
                    {showRetryButton && (
                        <button
                            onClick={onRetry}
                            className="group flex items-center cursor-pointer justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50"
                            style={{
                                backgroundColor: '#FABA00',
                                color: '#2A2A2A',
                                focusRingColor: '#FABA00'
                            }}
                        >
                            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                            Try Again
                        </button>
                    )}
                </div>

                {/* Help Section */}
                <div
                    className="rounded-2xl p-6 shadow-sm"
                    style={{ backgroundColor: 'white' }}
                >
                    <h3
                        className="font-semibold text-lg mb-4 flex items-center justify-center gap-2"
                        style={{ color: '#2A2A2A' }}
                    >
                        <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ backgroundColor: '#FABA00', color: '#2A2A2A' }}
                        >
                            ?
                        </span>
                        What can you try?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#FABA00' }}
                            ></div>
                            Check your spelling
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#FABA00' }}
                            ></div>
                            Create a New Book
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#FABA00' }}
                            ></div>
                            Browse by Category
                        </div>
                        <div className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: '#FABA00' }}
                            ></div>
                            Check connection
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NoBookFound