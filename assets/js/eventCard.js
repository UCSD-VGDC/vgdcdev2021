class EventCard extends HTMLElement  {

    constructor() {
        super();
        this.showInfo = true;
        // Attach the shadow DOM to this Web Component
        const shadow = this.attachShadow({ mode: "open" });

        // Div element to hold elements
        const shadow_div = document.createElement("div");


        const shadow_style = document.createElement("style");

        shadow_style.textContent = `

            section#cardContent {
                position: relative;
                width: 380px;
                height: 348px;
                margin: 0 24px 48px 0;
                padding: 24px;
                background-color: rgb(65,71,103);
                border-radius: 32px;
                overflow: hidden;
                transition: .2s ease-in-out;
                cursor: pointer;
                display: flex;
                justify-content: center;
                flex-direction: column;

            }      

            @media screen and (max-width: 480px) {
                section#cardContent {
                    scale: 0.77;
                    transform-origin: top left; /* Set the transform origin to the top-left corner */
                    margin-right: -64px;
                }

                article#cardDetails p#description {
                    font-size: 16px !important;
                } 
               
                
            }
          


            section#cardContent:hover article#cardDetails {
                transform: translateY(0);
                opacity: 1;
            }
              
            section#cardContent:hover #cardPreview {
                opacity: 0;
            }
            
           

            #cardPreview {
                display: flex;
                flex-direction: column;
                width: inherit;
                height: 348px;
                transition: all 0.3s ease-in-out;
                position: absolute;
            
                & img {
                    width: 100%;
                    height: 280px;
                    border-radius: 20px;
                    object-fit: scale;
                    margin-bottom: 1rem;
                }
            }

            #eventHeader {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                padding: 0;

                & svg {
                    background: linear-gradient(30deg, #ce68d9, #45c6db);
                    border-radius: 12px;
                    padding: 10px;
                    min-width: 32px;
                    min-height: 32px;
                }

                & h2 {
                    margin-left: 0.8rem;
                    margin-top: 0;
                    font-size: 1.4rem;
                    line-height: 1.4rem;
                    padding: 0;
                }
            }
            
            article#cardDetails {
                transform: translateY(100%);
                opacity: 0;
                transition: all 0.3s ease-in-out;
                height: 348px;
                position: relative;
                width: 100%;
                display: flex
                flex-direction: column;
                justify-content: space-between;

                p#description {
                    color: light-grey;
                    font-size: 0.9rem;
                }

                #timeDetails {
                    width: 100%;
                    margin-bottom: 1rem;
                    display: flex;
                    justify-content: space-between;
                    padding: 0;
                    align-items: center;
                    
                    & time.dateTime {
                        width: 100%;
                        display: block;
                        font-size: 1rem;
                        color: white;
                    }

                    & h2, p#dateTime {
                        margin: 0;
                    }

                    & button {
                        border: none;
                        background: #ce68d9;
                        padding: 10px 12px;
                        margin: 0;
                        border-radius: 14px;
                        font-size: 1.1rem;
                        color: white;
                        margin-left: 6rem;
                        transition: all 0.2s ease-in;
                        cursor: pointer;
                    }

                    & button:hover {
                        box-shadow: 0px 2px 5px rgba(255, 70, 200, 0.8);
                    }
    
                    
                }
                
            }


        `;
        
        shadow.append(shadow_style, shadow_div);

    }


    /** 
     * Updates the card info with passed in props
     *  @param {Object} props 
     * 
     *      props {
     *          "title": string,
     *			"description": string,
     *			"location": string,
     *			"date": date,
     *			"start_time": time,
     *			"end_time": time,
     *			"photo_url": string
     *      }
     */
    set data(props) {
        const shadow_div = this.shadowRoot.querySelector('div');
        const format = { month: 'long', day: 'numeric' };
        const date = new Date(props["date"]);
        const formattedDate = date.toLocaleDateString('en-US', format);

        const mapping = {
            "December": "Dev", 
            "January": "Jan", 
            "February": "Feb", 
            "March": "Mar", 
            "April": "Apr", 
            "May": "May", 
            "June": "Jun", 
            "July": "Jul", 
            "August": "Aug", 
            "September": "Sep", 
            "October": "Oct", 
            "November": "Nov", 
        }


        let month = formattedDate.split(' ')[0].trim(); // Extract the day of the week
        let abbrevMonth = mapping[month];
        
        // Extract the file ID from the URL using the regular expression
        var regex = /\/file\/d\/([^\/\?&%\s]+)\/|id=([^\/\?&%\s]+)(?:&|$)/;        
        const match = props["photo_url"].match(regex);
        const fileId = match && (match[1] || match[2]);

        let convertedUrl = "";
    
        if (fileId) {
            // Construct the modified Google Drive URL with the file ID
            convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
            convertedUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
            // convertedUrl = `https://drive.usercontent.google.com/download?id=${fileId}&export=view&authuser=2`;
            console.log(convertedUrl)
        } 

        const formatCalendarTime = (dateString, timeString)  => {
            console.log(dateString, timeString)
            const dateParts = dateString.split('/');
            const year = parseInt(dateParts[2], 10);
            const month = parseInt(dateParts[0], 10) - 1; // Months are 0-indexed in JavaScript
            const day = parseInt(dateParts[1], 10);
        
            console.log("Original timeString:", timeString);
            const timeParts = timeString.match(/(\d+):(\d+)\s?(\w+)/);
            console.log("Match result:", timeParts);

            let hours = parseInt(timeParts[1], 10);
            const minutes = parseInt(timeParts[2], 10);
            const period = timeParts[3].toUpperCase();

            console.log("period", period)
            // Adjust hours for PM
            if (period === 'PM' && hours < 12) {
                hours += 12 ;
            } else if (period === 'AM' && hours === 12) {
                // Adjust midnight (12:00AM) to 0 hours
                hours += 0;
            }
            // Create a new Date object with the parsed values
            const date = new Date(year, month, day, hours, minutes);
        
            // Format the date for Google Calendar
            return date.toISOString().replace(/-|:|\.\d+/g, '');
        };



                
        const getGoogleCalendarLink = () => {

            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                "VGDC: " + props["title"]
            )}&details=${encodeURIComponent(
                props["description"] 
            )}&dates=${encodeURIComponent(
                formatCalendarTime(`${props['date']}`, `${props[`start_time`]}`)
            )}/${encodeURIComponent(
                formatCalendarTime(`${props[`date`]}`, `${props[`end_time`]}`)
            )}&location=${encodeURIComponent(props["location"])}`;
        }


        
        shadow_div.innerHTML =
        `
            <section id = "cardContent">

                <div id = "cardPreview">
                    ${props["photo_url"] ? `<img referrer-policy = "no-referrer" src=${convertedUrl} alt="event card photo">` : ''}
                    <section id = "eventHeader">
                        <svg width="32px" height="32px" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="11.375" y="12.8333" width="1.75" height="1.83333" rx="0.875" fill="white"/>
                            <rect x="6.125" y="10.0833" width="1.75" height="5.5" rx="0.875" fill="white"/>
                            <rect x="9.625" y="11.9167" width="1.83333" height="5.25" rx="0.916667" transform="rotate(90 9.625 11.9167)" fill="white"/>
                            <rect x="14" y="11" width="1.75" height="1.83333" rx="0.875" fill="white"/>
                            <path d="M12.25 7.33325V7.30894C12.25 7.05661 12.25 6.93044 12.2372 6.81804C12.1533 6.07856 11.6657 5.44684 10.9717 5.1783C10.8662 5.13748 10.7441 5.10552 10.5 5.04159V5.04159C10.2559 4.97765 10.1338 4.94569 10.0283 4.90487C9.33426 4.63633 8.84668 4.00461 8.76276 3.26513C8.75 3.15273 8.75 3.02656 8.75 2.77423V1.83325" stroke="white" stroke-width="2" stroke-linecap="round"/>
                            <path d="M2.625 12.8333C2.625 10.4877 2.625 9.31489 3.16745 8.50697C3.3071 8.29897 3.47 8.11279 3.652 7.95319C4.35893 7.33325 5.38512 7.33325 7.4375 7.33325H13.5625C15.6149 7.33325 16.6411 7.33325 17.348 7.95319C17.53 8.11279 17.6929 8.29897 17.8326 8.50697C18.375 9.31489 18.375 10.4877 18.375 12.8333C18.375 15.1788 18.375 16.3516 17.8326 17.1595C17.6929 17.3675 17.53 17.5537 17.348 17.7133C16.6411 18.3333 15.6149 18.3333 13.5625 18.3333H7.4375C5.38512 18.3333 4.35893 18.3333 3.652 17.7133C3.47 17.5537 3.3071 17.3675 3.16745 17.1595C2.625 16.3516 2.625 15.1788 2.625 12.8333Z" stroke="white" stroke-width="2"/>      
                        </svg>
                        <h2>${props["title"]}</h2>

                    </section>
                </div>
                

                <article id = "cardDetails">
                    <p id = "description">${props["description"]}</p>
                    <section id = "timeDetails">
                        <div>
                            <time class = "dateTime"><b>${formattedDate.replace(month, abbrevMonth)}</b></time>
                            <time class = "dateTime"><b>${props["start_time"]} - ${props["end_time"]}</b></time>
                        </div>
                        <button id = "scheduleButton"><b>schedule<b></button>

                    </section>

                </article>
            </section>   
        `

        this.shadowRoot.getElementById('scheduleButton').addEventListener("click", () => {
            // Don't dispatch the click event. Instead use a custom event
            this.dispatchEvent(new CustomEvent("trigger-calendar", {
                composed: true,
                bubbles: true,
                detail: getGoogleCalendarLink()
            }))
        })
    }

}

customElements.define("event-card", EventCard);