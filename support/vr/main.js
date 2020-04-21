new Vue({
    el: "#app",
    data: {
        firmen: [],
        div_top: 4,
        div_left: 0,
        add_div_top: 420,
        add_div_left: 289,
        style_div: "position: absolute;",
        search: "",
        filteredList:[]
    },
    methods: {
        readJSON(){
            this.loadJSON("./list.json", (text) => {
                this.firmen = Object.values(JSON.parse(text))
                this.filteredList = this.firmen

                //SHUFFLE CARDS
                for(let i = this.filteredList.length - 1; i > 0; i--) {
                    let randomIndex = Math.floor(Math.random() * i);
                    
                    let temp = this.filteredList[i];
                    Vue.set(this.filteredList, i, this.filteredList[randomIndex]);
                    Vue.set(this.filteredList, randomIndex, temp);
                  }
                  
                $(document).ready(function() {
                $(".pageloader").toggleClass("is-active");
                });
            })
        },

        loadJSON(file, cb){
            // Copied from https://wiki.selfhtml.org/wiki/JSON
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType('application/json');
            xobj.open('GET', file, true); 
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == '200') {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                cb(xobj.responseText);
                }
            };
            xobj.send(null);
        },
        currentTop(index){
            let max = Math.floor(window.innerWidth / this.add_div_left)
            return this.div_top + this.add_div_top*Math.floor(index/max)
        },
        currentLeft(index){
            max = Math.floor(window.innerWidth / this.add_div_left)
            for (let i = 0; i < max; i++){
                if (index % max == i){
                    return this.div_left + i*this.add_div_left
                }
            }
        },
        calculateHeight(){
            let len = this.filteredList.length
            let max = Math.floor(window.innerWidth / this.add_div_left)
            return this.div_top + this.add_div_top*Math.ceil(len/max) + 100
        
    },

    shuffleCards() {        
        for(let i = this.filteredList.length - 1; i > 0; i--) {
          let randomIndex = Math.floor(Math.random() * i);
          
          let temp = this.filteredList[i];
          Vue.set(this.filteredList, i, this.filteredList[randomIndex]);
          Vue.set(this.filteredList, randomIndex, temp);
        }
      },

    // Filter by category

    showAll(){
        this.filteredList =  this.firmen
    },
    showDienstleistung(){
        this.filteredList =  this.firmen.filter(firma => {
            return firma.category.toLowerCase().includes("dienstleistung")

            
        })
    },
    showEinzelhandel(){
        this.filteredList =  this.firmen.filter(firma => {
            return firma.category.toLowerCase().includes("einzelhandel")
        })
    },

    showGastronomie(){
        this.filteredList =  this.firmen.filter(firma => {
            return firma.category.toLowerCase().includes("gastronomie")
        })
    },
    showUnterhaltung(){
        this.filteredList =  this.firmen.filter(firma => {
            return firma.category.toLowerCase().includes("unterhaltung")
        })
    },
    showAndere(){
        this.filteredList =  this.firmen.filter(firma => {
            const einzelhandel = firma.category.toLowerCase().includes("einzelhandel");
            const unterhaltung = firma.category.toLowerCase().includes("unterhaltung");
            const dienstleistung = firma.category.toLowerCase().includes("dienstleistung");
            const gastronomie = firma.category.toLowerCase().includes("gastronomie");
            if (!einzelhandel && !unterhaltung && !dienstleistung && !gastronomie){
                return true;
            }
        })
    },
    filterByName(){
        let filteredCategory = new Set()
        for (firma of this.filteredList){
            filteredCategory.add(firma.category.toLowerCase())
        }

        this.filteredList = this.firmen.filter(firma => {
            console.log(filteredCategory.has(firma.category.toLowerCase()))
            return filteredCategory.has(firma.category.toLowerCase())
        })
        
        this.filteredList = this.firmen.filter(firma => {
            return firma.firmname.toLowerCase().includes(this.search.toLowerCase())
        })
    }

},

    beforeMount(){
        this.readJSON()
    }

})