Vue.component('search', {
    data() {
        return {
            userSearch: ''
        }
    },
    mounted() {

    },
    methods: {
    },
    template: `<div>
                    <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter">
                        <input type="text" class="search-field" v-model="userSearch" :userSearch="userSearch">
                        <button type="submit" class="btn-search">
                            <i class="fas fa-search"></i>
                        </button>
                    </form>
               </div>`
});