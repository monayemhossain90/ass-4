import httpStatus from 'http-status';
import serverResponse from '../../ulitities/serverResponse';
import wrapAsync from '../../ulitities/wrapAsync';
import { AdminServices } from './admin.service';

const getAllAdmins = wrapAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB();
  serverResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are Retrieved Succesfully!!!',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
};
