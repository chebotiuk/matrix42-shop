export class CartController {
  constructor(entryId, entriesService, $timeout) {
    'ngInject';

    this.EditEntryForm = {};
    this.entry = null;
    this.entryId = entryId;
    this.successMessage = false;
    this.errorMessage = false;
    this.datepickerOpened = false;
    this.submitted = false;

    this.entriesService = entriesService;
    this.$timeout = $timeout;

    this.activate();
  }

  activate() {
    this.entriesService.getEntryById(this.entryId)
      .then((response) => {
        this.$timeout(() => {
          this.entry = response;
        });
      });
  }

  openDatepicker() {
    this.datepickerOpened = true;
  }

  edit() {
    this.successMessage = false;
    this.errorMessage = false;

    if (this.EditEntryForm.$invalid) {
      this.submitted = true;

      return false;
    }

    return this.entriesService.editEntry(this.entryId, this.entry)
      .then((response) => {
        this.$timeout(() => {
          this.successMessage = response.message;
        });
      }, (response) => {
        this.$timeout(() => {
          this.errorMessage = response.message;
        });
      });
  }

}
