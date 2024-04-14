export class Category {
    categoryName: string;
    exerciseName: string;
    licksAmount: number;
    categorySelected: boolean;
    exerciseSelected: boolean;

    constructor(obj: any) {
        this.categoryName = obj && obj.categoryName ? obj.categoryName : '';
        this.exerciseName = obj && obj.exerciseName ? obj.exerciseName : '';
        this.licksAmount = obj && obj.licksAmount || 0;
        this.categorySelected = obj && typeof obj.categorySelected === 'boolean' ? obj.categorySelected : false;
        this.exerciseSelected = obj && typeof obj.exerciseSelected === 'boolean' ? obj.exerciseSelected : false;
    }

    toJson() {
        return {
            categoryName: this.categoryName,
            exerciseName: this.exerciseName,
            licksAmount: this.licksAmount,
            categorySelected: this.categorySelected,
            exerciseSelected: this.exerciseSelected,
        }
    }
}