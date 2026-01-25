export default function Footer() {
    return (
        <footer className="bg-[#003566ff] p-4 mt-8 fixed bottom-0 w-full">
            <div className="container mx-auto text-center text-white x lg:text-[14px]">
                &copy; {new Date().getFullYear()} Clube de Tiro. Todos os direitos reservados.
            </div>
        </footer>
    )
}