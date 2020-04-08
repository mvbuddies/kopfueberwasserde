new Vue({
    el: "#app",
    data: {
        firmen: [],
        div_top: 4,
        div_left: 0,
        add_div_top: 420,
        add_div_left: 289,
        style_div: "position: absolute;",
        search: ""
    },
    methods: {
        readJSON(){
            this.loadJSON("./list.json", (text) => {
                this.firmen = Object.values(JSON.parse(text))
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
        }
    },

    computed: {
        filteredList() {
            return this.firmen.filter(firma => {
                return firma.firmname.toLowerCase().includes(this.search.toLowerCase())
            })
        }
    },

    beforeMount(){
        this.readJSON()
    }

})