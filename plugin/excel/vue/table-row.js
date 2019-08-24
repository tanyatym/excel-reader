Vue.component('table-row', {
    template: `
    <tr>
        <td v-for="(value, i) in values" :key="i">
            {{ value }}
        </td>
    </tr>`,

    props: {
        values: {
            type: Array,
            default: null
        }
    }
})