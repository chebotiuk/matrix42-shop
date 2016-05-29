export class entriesService {
  constructor($window, currentEntryService) {
    'ngInject';

    this.entries = angular.fromJson($window.localStorage.getItem('entries')) || [];

    if (this.entries.length > 0) {
      for (let i = this.entries.length; i--;) {
        this.entries[i].dateOfBirth = new Date(this.entries[i].dateOfBirth);
      }
    }

    this.currentEntryService = currentEntryService;
    this.$window = $window;
  }

  get() {
    return this.entries;
  }

  getEntries(page) {
    const perPage = 5;
    const start = (page - 1) * perPage;
    const tmpArr = angular.copy(this.entries);
    const currentEntry = this.currentEntryService.get();

    for (let i = tmpArr.length; i--;) {
      tmpArr[i].id = i + 1;
    }

    tmpArr.splice(_.findIndex(tmpArr, {
      email: currentEntry.email,
      password: currentEntry.password,
    }), 1);

    return Promise.resolve({
      totalEntries: tmpArr.length,
      entries: tmpArr.slice(start, start + perPage),
    });
  }

  getEntryById(id) {
    return Promise.resolve(this.entries[id - 1]);
  }

  editEntry(id, newEntry) {
    const tmpArr = angular.copy(this.entries);
    return this.getEntryById(id)
      .then((editedEntry) => {
        tmpArr.splice(_.findIndex(tmpArr, editedEntry), 1);

        if (_.find(tmpArr, { email: newEntry.email })) {
          return Promise.reject({ message: 'User with this email already exists' });
        }

        _.merge(this.entries[id - 1], newEntry);
        this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

        return Promise.resolve({ message: 'User edited succesfully' });
      });
  }

  createEntry(newEntry) {
    if (_.find(this.entries, { email: newEntry.email })) {
      return Promise.reject({ message: 'User with this email already exists' });
    }
    this.entries.push(newEntry);
    this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

    return Promise.resolve({ message: 'User created succesfully' });
  }

  deleteEntry(id) {
    this.entries.splice(id - 1, 1);
    this.$window.localStorage.setItem('entries', angular.toJson(this.entries));

    return Promise.resolve();
  }
}
