import React from 'react';

export default function  VistaRanking (){
    return (
        <div id="info" className="">
            <div id="partidas" className="m-5 p-5 bg-dark">
                <h2 className="text-center text-light">Ranking</h2>
                <table className="table table-dark align-middle">
                    <theader>
                        <tr className="bg-dark">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </theader>
                    <tbody>
                        <tr>
                            <td className="fs-2">1</td>
                            <td><img width="50" height="50" src="https://www.svgrepo.com/show/384669/account-avatar-profile-user-13.svg" alt="avatar" /></td>
                            <td>ANDER</td>
                            <td>1255</td>
                        </tr>
                        <tr>
                            <td className="fs-2">2</td>
                            <td><img width="50" height="50" src="https://www.svgrepo.com/show/384672/account-avatar-profile-user-7.svg" alt="avatar" /></td>
                            <td>ANDER</td>
                            <td>1255</td>
                        </tr>
                        <tr>
                            <td className="fs-2">3</td>
                            <td><img width="50" height="50" src="https://www.svgrepo.com/show/384676/account-avatar-profile-user-6.svg" alt="avatar" /></td>
                            <td>ANDER</td>
                            <td>1255</td>
                        </tr>
                    </tbody>
                    <tfoot></tfoot>
                </table>
            </div>
        </div>
    );
};

