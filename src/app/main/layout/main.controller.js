export class MainController {
  constructor(authService, $state, $uibModal) {
    'ngInject';

    this.$state = $state;

    this.authService = authService;
    this.$uibModal = $uibModal;
  }

  logout() {
    const modalInstance = this.$uibModal.open({
      template: `<div class="">
                  <div class="modal-header">
                    <h4 class="modal-title">Do you really want to log out?</h4>
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
      this.authService.logout();
    });
  }
}
