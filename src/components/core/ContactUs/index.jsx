import ContactForm from "./ContactForm"
import ContactInfo from "./ContactInfo"

export default function ContactUs(){
    return (
        <div>
            <div className="w-11/12 max-w-maxContent mx-auto grid grid-flow-col grid-cols-3 gap-10 lg:py-10">
                <ContactInfo />
                <ContactForm />
            </div>
        </div>
    )
}