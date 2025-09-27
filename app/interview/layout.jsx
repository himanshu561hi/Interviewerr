
import { InterviewDataProvider } from "@/context/InterviewDataContext";
import InterviewHeader from "../../app/interview/_components/InterviewHeader";


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
              <InterviewHeader/>
                <InterviewDataProvider>{children}</InterviewDataProvider>
            </body>
        </html>
    );
}