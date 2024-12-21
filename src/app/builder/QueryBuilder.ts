import { FilterQuery, Query, Types } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    (this.modelQuery = modelQuery), (this.query = query);
  }

  // Method for search
  search(searchableField: string[]) {
    const search = this?.query?.search;
    console.log(search);

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableField.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  // Method for filtering
  filter() {
    const queryObj = { ...this.query };
    const excludingImportant = ['search', 'sortBy', 'sortOrder'];

    excludingImportant.forEach((key) => delete queryObj[key]);

    if (queryObj.filter) {
      queryObj._id = new Types.ObjectId(queryObj.filter as string);
      delete queryObj.filter;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
    return this;
  }

  // Method for sort
  sort() {
    const sortBy = this?.query?.sortBy || '-createdAt';
    const sortOrder = this?.query?.sortOrder === 'desc' ? -1 : 1;

    this.modelQuery = this.modelQuery.sort({ [sortBy as string]: sortOrder });
    return this;
  }
}

export default QueryBuilder;
