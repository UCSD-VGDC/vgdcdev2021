class EventCard extends HTMLElement  {

    constructor() {
        super();
        this.showInfo = true;
        // Attach the shadow DOM to this Web Component
        const shadow = this.attachShadow({ mode: "open" });

        // Div element to hold elements
        const shadow_div = document.createElement("div");

        // Style element for the coffee cards
        const shadow_style = document.createElement("style");

        shadow_style.textContent = `

            div {
                display: flex;
                box-sizing: border-box;
                justify-content: center;
                flex-direction: column;
                text-align: center;
                max-width: 480px;
                margin: 0 24px 48px 0;
            }

            h2, p#dateTime {
                margin: 0;
            }

            #cardContent {
                display: flex;
                background: white;
                height: 320px;
                width: 480px;
                border-radius: 20px;
            }

            svg {
                position: relative;
                top: 24px;
                right: 24px;
                z-index: 13;
            }


            #imageContainer {
                z-index: 10;
                position: absolute;

                & img {
                    width: 480px;
                    height: 320px;
                    border-radius: 20px;
                    object-fit: cover;
                    z-index: 11;
                }
            }

            #eventDetails {
                display: none;
                z-index: 12;

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
	 *			"time_start": time,
	 *			"time_end": time,
	 *			"photo_url": string
     *      }
     */
    set data(props) {
        const shadow_div = this.shadowRoot.querySelector('div');

        shadow_div.innerHTML =

        `
            <section id = "cardContent">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" width="34" height="34"><path d="M 12 1 C 10.346 1 9 2.346 9 4 C 9 5.654 10.346 7 12 7 C 13.654 7 15 5.654 15 4 C 15 2.346 13.654 1 12 1 z M 13 7.1035156 L 13 12 C 13 12.552 12.553 13 12 13 C 11.447 13 11 12.552 11 12 L 11 7.1054688 C 10.652 7.1794687 10.308609 7.2884531 9.9746094 7.4394531 L 2.1347656 10.96875 C 1.4647656 11.27075 1.0299531 11.936031 1.0019531 12.707031 C 0.97395312 13.484031 1.360625 14.185063 2.015625 14.539062 L 8.6972656 18.154297 C 9.7312656 18.714297 10.866953 18.994141 12.001953 18.994141 C 13.136953 18.994141 14.270687 18.713297 15.304688 18.154297 L 21.986328 14.539062 C 22.640328 14.185063 23.028 13.484031 23 12.707031 C 22.971 11.936031 22.536234 11.27075 21.865234 10.96875 L 14.025391 7.4375 C 13.691391 7.2865 13.348 7.1775156 13 7.1035156 z M 7.5 12 C 8.328 12 9 12.448 9 13 C 9 13.552 8.328 14 7.5 14 C 6.672 14 6 13.552 6 13 C 6 12.448 6.672 12 7.5 12 z M 1.3554688 16.509766 C 1.1670312 16.516938 1 16.671313 1 16.882812 L 1 17.615234 C 1 18.169234 1.3135469 18.675875 1.8105469 18.921875 L 8.2949219 22.130859 C 9.4719219 22.713859 10.735 23.005859 12 23.005859 C 13.264 23.005859 14.527078 22.713859 15.705078 22.130859 L 22.197266 18.917969 C 22.688266 18.674969 23 18.173953 23 17.626953 L 23 16.884766 C 23 16.602766 22.701125 16.420687 22.453125 16.554688 C 20.847125 17.424688 16.255859 19.914062 16.255859 19.914062 C 14.948859 20.621063 13.478 20.994141 12 20.994141 C 10.522 20.994141 9.0511406 20.621062 7.7441406 19.914062 C 7.7441406 19.914062 3.152875 17.424687 1.546875 16.554688 C 1.484875 16.520938 1.4182812 16.507375 1.3554688 16.509766 z"/></svg>

                <span id = "imageContainer">

                    ${props["photo_url"] ? `<img src="${props["photo_url"]}" alt="event card photo">` : ''}
                </span>
                
                <article id = "eventDetails">
                    <h3>${props["title"]}</h3>
                    <span id = "eventIcon"></span>
                    <p>${props["description"]}</p>

                    <button>schedule</button>
                </article>
            </section>

            <section id = "bottomCardContent">
                <h2>${props["title"]}</h2>
                <p id = "dateTime">${props["date"]}    |   ${props["start_time"]} - ${props["end_time"]}</p>
            </section>

          
        `
    }

  


}

customElements.define("event-card", EventCard);