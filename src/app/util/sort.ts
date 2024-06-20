export class Sort {

    private sortOrder = 1;
    private collator = new Intl.Collator(undefined, {
        numeric: true,
        sensitivity: "base",
    })

    constructor() { }

    public startSort(property: string, order: string, type = "") {
        // console.log(property,order,type);
        if (order === "desc") {
            this.sortOrder = -1;
            // console.log(this.sortOrder);
        }
        return (a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            if (type === "date") {
                // console.log(this.sortData(new Date(a[property]), new Date(b[property])));
                return this.sortData(new Date(a[property]), new Date(b[property]));
            } else {
                // console.log(this.collator.compare(a[property], b[property]) * this.sortOrder);
                return this.collator.compare(a[property], b[property]) * this.sortOrder;
            }
        }
    }

    private sortData(a: number | Date, b: number | Date) {
        console.log(a);
        if (a < b) {
            return -1 * this.sortOrder;
        } else if (a > b) {
            return 1 * this.sortOrder;
        } else {
            return 0 * this.sortOrder;
        }
    }
}