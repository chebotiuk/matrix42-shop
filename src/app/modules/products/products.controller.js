export class EntriesController {
  constructor(page, entriesService, $timeout, $state, $uibModal) {
    'ngInject';

    this.entries = null;
    this.totalEntries = null;
    this.currentPage = page;

    this.entriesService = entriesService;
    this.$timeout = $timeout;
    this.$state = $state;
    this.$uibModal = $uibModal;

    this.activate(this.currentPage);
  }

  activate(page) {
    this.entriesService.getEntries(page)
      .then((response) => {
        this.$timeout(() => {
          this.totalEntries = response.totalEntries;
          this.entries = response.entries;
        });
      });
  }

  pageChanged(newPage) {
    this.$state.go('index.all', { page: newPage });
  }

  editEntry(id) {
    this.$state.go('index.edit', { entryId: id });
  }

  removeEntry(id) {
    const modalInstance = this.$uibModal.open({
      template: `<div class="">
                  <div class="modal-header">
                    <h4 class="modal-title">Do you really want to delete entry?</h4>
                  </div>
                  <div class="modal-footer">
                    <button class="btn btn-white" ng-click="vm.cancel()">No</button>
                    <button class="btn btn-primary" ng-click="vm.ok()">Yes</button>
                  </div>
                </div>`,
      controller: class ModalConfirm {
        constructor($uibModalInstance) {
          'ngInject';

          this.$uibModalInstance = $uibModalInstance;
        }

        ok() {
          this.$uibModalInstance.close();
        }

        cancel() {
          this.$uibModalInstance.dismiss('cancel');
        }
      },
      controllerAs: 'vm',
    });

    modalInstance.result.then(() => {
      this.entriesService.deleteEntry(id)
        .then(() => {
          this.activate(this.currentPage);
        });
    });
  }

}
