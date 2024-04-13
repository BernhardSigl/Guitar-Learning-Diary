export class Category {
    categoryName: string;
    exerciseName: string;
    licksAmount: number;
    exerciseId: string;

    constructor(obj: any) {
        this.categoryName = obj && obj.categoryName ? obj.categoryName : '';
        this.exerciseName = obj && obj.exerciseName ? obj.exerciseName : '';
        this.licksAmount = obj && obj.licksAmount ? obj.licksAmount : '';
        this.exerciseId = obj && obj.exerciseId ? obj.exerciseId : '';
    }

    toJson() {
        return {
            categoryName: this.categoryName,
            exerciseName: this.exerciseName,
            licksAmount: this.licksAmount,
            exerciseId: this.exerciseId,
        }
    }
}