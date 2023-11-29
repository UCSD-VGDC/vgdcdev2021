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
                height: 300px;
                max-width: 480px;
                border-radius: 20px;
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
                <span id = 'imageContainer'>
                    ${props["photo_url"] ? `<img src="${props["photo_url"]}" alt="event card photo">` : ''}
                </span>
                <article>
                    <h3>${props["title"]}</h3>
                    <span id = "eventIcon"></span>
                    <p>${props["description"]}</p>

                    <button>schedule</button>
                </article>
            </section>

            <h2>${props["title"]}</h2>
            <p id = "dateTime">${props["date"]}    |   ${props["start_time"]} - ${props["end_time"]}</p>
        `
    }

  


}

customElements.define("event-card", EventCard);