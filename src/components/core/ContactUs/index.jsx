import ContactForm from "./ContactForm"
import ContactInfo from "./ContactInfo"

export default function ContactUs(){
    return (
        <div>
            <div className="w-11/12 mt-14 p-4 md:p-0 max-w-maxContent mx-auto flex flex-col md:grid md:grid-flow-col grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-3 gap-10 lg:py-10">
                <ContactInfo />
                <ContactForm />
            </div>
        </div>
    )
}