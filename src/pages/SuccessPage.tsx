
import React from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const SuccessPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const licenseKey = searchParams.get("chave");

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow bg-gradient-to-r from-green-100 via-white to-green-50 flex items-center justify-center p-6">
                <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-xl text-center border border-green-300">
                    <h1 className="text-3xl font-bold text-green-700 mb-4">
                        Chave Gerada com Sucesso!
                    </h1>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        🎉 Sua <strong>chave de acesso</strong> foi ativada com sucesso
                        e está <strong>válida por 3 dias corridos</strong>.<br />
                        Aproveite essa oportunidade para explorar todos os recursos da nossa
                        plataforma sem compromisso.
                    </p>
                    <br />
                    {licenseKey && (
                        <div className="mt-6 bg-green-50 border border-green-300 rounded-md p-4">
                            <p className="text-sm text-gray-500 mb-2">Sua chave de licença:</p>
                            <code className="text-green-700 text-lg font-mono select-all">{licenseKey}</code>
                        </div>
                    )}
                    <br />
                    <div className="mt-6">
                        <p className="text-gray-600">
                            Ao final do período de teste, você poderá escolher o plano que melhor atende às suas necessidades.
                        </p>
                    </div>

                    <div className="mt-8">
                        <Button
                            asChild
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <a href="/">Voltar para a Página Inicial</a>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SuccessPage;
