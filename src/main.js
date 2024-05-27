import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import RoutePresenter from './presenter/leader-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import TripInfo from './presenter/trip-info-presenter.js';

import CreatePointPresenter from './presenter/creating-point-presenter.js';
import MainApiService from './service/api-service.js';
import FiltersModel from './model/filters-model.js';

const apiService = new MainApiService();
const pointsModel = new PointsModel(apiService);
const offersModel = new OffersModel(apiService);
const destinationsModel = new DestinationsModel(apiService);
const filtersModel = new FiltersModel();

const pointsContainer = document.querySelector('.trip-events');
const filtersContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');

const createPointPresenter = new CreatePointPresenter({
  container: tripMainContainer,
  editorContainer: pointsContainer,
  offersModel,
  destinationsModel,
});
const routePresenter = new RoutePresenter({
  container: pointsContainer,
  createPointPresenter,
  pointsModel,
  offersModel,
  destinationsModel,
  filtersModel,
});

const tripInfo = new TripInfo({
  container: tripMainContainer,
  destinationsModel,
  offersModel,
  pointsModel,
});

const filtersPresenter = new FiltersPresenter({ container: filtersContainer, pointsModel, filtersModel });

const bootstrap = async () => {
  await Promise.all([
    offersModel.init(),
    destinationsModel.init(),
  ]);
  pointsModel.init();
  routePresenter.init();
  filtersPresenter.init();
  tripInfo.init();
};
bootstrap();
