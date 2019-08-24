Vue.component('table-header', {
    template: `
    <tr>
        <th v-for="(name, i) in collNames" :key="i">
            {{ name }}
        </th>
    </tr>`,

    props: {
        collNames: {
            type: Array,
            default: null
        }
    }
})