export default {
  data: function () {
    return {
      list: [],
      listLoading: true,
      total: 0,
      dict: undefined,
      query: {
        page: 1,
        pageSize: undefined,
        sort: undefined,
        keyword: undefined
      }
    }
  }
}
