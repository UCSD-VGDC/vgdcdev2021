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

        shadow_style.textContent = "";
        
        shadow.append(shadow_style, shadow_div);
        

    }

    /** 
     * Updates the card info with passed in props
     *  @param {Object} props 
     * 
     *      props {
     *          photo_url: "string",
     *          title: "string",
     *          description: "string".
     *          time: "string",
     *          location: "string"
     *      }
     */
    set data(props) {
        shadow_div.innerHTML =

        `
            <picture>
                <img src = ${props.photo_url} alt = "event card photo">
            </picture> 

            <h2>${props.title}</h2>
            <p>${props.time}</p>
        `
    }


}

customElements.define('event-card', EventCard);